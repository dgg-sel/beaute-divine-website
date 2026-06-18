import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import AdminPanel from "@/components/AdminPanel";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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

 return (
 <div className="max-w-container-max mx-auto px-8 py-section-padding">
 <h1 className="font-headline-lg text-4xl mb-8 text-primary">Panel de Administración</h1>
 <AdminPanel products={products} categories={categories} users={users} />
 </div>
 );
}
