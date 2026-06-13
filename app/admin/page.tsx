import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import AdminPanel from "@/components/AdminPanel";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  // TEMPORAL: Bypass de seguridad para que puedas probar el panel sin tener configurado Google Login aún
  // if (!session) {
  //   redirect("/api/auth/signin");
  // }

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  const products = await prisma.product.findMany({ 
    include: { category: true },
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="max-w-container-max mx-auto px-8 py-section-padding">
      <h1 className="font-headline-lg text-4xl mb-8 text-primary">Panel de Administración</h1>
      <AdminPanel products={products} categories={categories} />
    </div>
  );
}
