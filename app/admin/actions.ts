"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  if (!session?.user?.email || !adminEmails.includes(session.user.email.toLowerCase())) {
    throw new Error("No autorizado");
  }
}

cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
});

async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadPath = env.cloudinaryCatalogFolder
    ? `${env.cloudinaryRootFolder}/${env.cloudinaryCatalogFolder}`
    : env.cloudinaryRootFolder;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: uploadPath },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload to Cloudinary"));
        } else {
          resolve(result.public_id);
        }
      }
    ).end(buffer);
  });
}

export async function addCategory(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const parentIdRaw = formData.get("parentId");
  
  if (name) {
    let finalParentId: string | null = null;
    
    if (typeof parentIdRaw === 'string' && parentIdRaw !== 'none' && parentIdRaw !== 'null' && parentIdRaw !== 'undefined' && parentIdRaw.trim() !== '') {
      // Validate that parent exists to avoid Foreign Key constraint violation
      const parentExists = await prisma.category.findUnique({ where: { id: parentIdRaw } });
      if (parentExists) {
        finalParentId = parentIdRaw;
      }
    }

    // Check if category name already exists at the same level
    const existingCategory = await prisma.category.findFirst({ 
      where: { 
        name,
        parentId: finalParentId 
      } 
    });
    if (existingCategory) {
      return { error: "La categoría ya existe en este nivel" };
    }

    await prisma.category.create({ 
      data: { 
        name,
        parentId: finalParentId
      } 
    });
    revalidatePath("/admin");
    revalidatePath("/catalogo");
  }
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/catalogo");
}

export async function addProduct(formData: FormData) {
  await requireAdmin();
  await upsertProduct(null, formData);
}

export async function editProduct(id: string, formData: FormData) {
  await requireAdmin();
  await upsertProduct(id, formData);
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  
  const product = await prisma.product.findUnique({ where: { id } });
  if (product?.image) {
    try {
      await cloudinary.uploader.destroy(product.image);
    } catch (error) {
      console.error("Failed to delete image from Cloudinary:", error);
    }
  }
  
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/catalogo");
}

async function upsertProduct(id: string | null, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const tag = formData.get("tag") as string;
  const isImported = formData.get("isImported") === "on";

  let image = formData.get("existingImage") as string || "";

  const data = {
    title,
    description,
    categoryId: categoryId === "none" ? null : categoryId,
    image,
    price,
    stock,
    tag,
    isImported,
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/admin");
  revalidatePath("/catalogo");
}

export async function createManualUser(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  
  if (!name || !email) return { error: "Nombre y email son requeridos." };

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "Ya existe un usuario con este email." };

  await prisma.user.create({
    data: {
      name,
      email,
      role: "USER"
    }
  });

  revalidatePath("/admin");
}

export async function createManualOrder(userId: string, items: { productId: string, quantity: number, price: number }[], channel: string) {
  await requireAdmin();
  
  if (!userId || !items || items.length === 0) {
    return { error: "Faltan datos para crear la orden." };
  }

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  await prisma.order.create({
    data: {
      userId,
      status: "PAID",
      channel,
      total,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    }
  });

  revalidatePath("/admin");
}

export async function updateSetting(key: string, value: string) {
  try {
    await requireAdmin();
    
    await prisma.appSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });

    revalidatePath("/admin");
    revalidatePath("/checkout");
    revalidatePath("/api/checkout");
  } catch (error: any) {
    console.error("Error en updateSetting:", error);
    throw new Error(error.message || "Error interno al actualizar la configuración");
  }
}
