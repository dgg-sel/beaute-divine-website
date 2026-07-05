"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getReviewRoles() {
  return await prisma.reviewRole.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createReviewRole(name: string) {
  const existing = await prisma.reviewRole.findUnique({
    where: { name }
  });
  
  if (!existing) {
    await prisma.reviewRole.create({
      data: { name },
    });
    revalidatePath("/admin/review-roles");
  }
}

export async function createReviewRoleAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  if (!name?.trim()) return { error: "El nombre es requerido.", success: false, timestamp: Date.now() };
  
  const existing = await prisma.reviewRole.findUnique({
    where: { name: name.trim() }
  });
  
  if (existing) {
    return { error: "Este rol ya existe.", success: false, timestamp: Date.now() };
  }
  
  await prisma.reviewRole.create({
    data: { name: name.trim() },
  });
  
  revalidatePath("/admin/review-roles");
  return { error: "", success: true, timestamp: Date.now() };
}

export async function deleteReviewRole(id: string) {
  await prisma.reviewRole.delete({
    where: { id },
  });
  revalidatePath("/admin/review-roles");
}
