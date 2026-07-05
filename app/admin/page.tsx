import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import AdminPanel from "@/components/AdminPanel";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
 const session = await getServerSession(authOptions);
  
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  
  if (!session?.user?.email || !adminEmails.includes(session.user.email.toLowerCase())) {
    redirect("/login");
  }

 const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
 const products = await prisma.product.findMany({ 
 include: { category: true },
 orderBy: { createdAt: 'desc' } 
 });

 const users = await prisma.user.findMany({
   include: {
     orders: {
       include: {
         items: {
           include: { product: true }
         }
       },
       orderBy: { createdAt: 'desc' }
     }
   },
   orderBy: { name: 'asc' }
 });

  const uploadFolder = process.env.CLOUDINARY_CATALOG_FOLDER 
    ? `${process.env.CLOUDINARY_ROOT_FOLDER}/${process.env.CLOUDINARY_CATALOG_FOLDER}`
    : process.env.CLOUDINARY_ROOT_FOLDER;

 return (
 <div className="max-w-container-max mx-auto px-8 py-section-padding">
 <h1 className="font-headline-lg text-4xl mb-6 text-primary">Panel de Administración</h1>
 <div className="flex flex-wrap gap-6 mb-8 border-b border-primary/20 pb-4">
   <Link href="/admin" className="font-label-sm text-sm uppercase tracking-widest text-primary font-bold">Catálogo y Clientes</Link>
   <Link href="/admin/reviews" className="font-label-sm text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Reseñas</Link>
 </div>
 <AdminPanel products={products} categories={categories} users={users} uploadFolder={uploadFolder || "beaute-divine-espace/catalogo"} />
 </div>
 );
}
