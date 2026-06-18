import { prisma } from "@/lib/prisma";
import ImageModal from "@/components/ImageModal";
import Link from "next/link";
import CategoryDropdown from "@/components/CategoryDropdown";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = 'force-dynamic';

export default async function CatalogoPage({ searchParams }: { searchParams: { categoryId?: string } }) {
 const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
 
 let whereClause: any = {};

 if (searchParams.categoryId === 'uncategorized') {
 whereClause = { categoryId: null };
 } else if (searchParams.categoryId) {
 const subCategories = categories.filter(c => c.parentId === searchParams.categoryId);
 const categoryIdsToInclude = [searchParams.categoryId, ...subCategories.map(c => c.id)];
 
 whereClause = {
 categoryId: { in: categoryIdsToInclude }
 };
 }

 const products = await prisma.product.findMany({ 
 where: whereClause,
 include: { category: true },
 orderBy: { createdAt: "desc" } 
 });

 return (
 <main className="pt-20 pb-section-padding max-w-container-max mx-auto px-8">
 {/* Hero Title Section */}
 <section className="mb-20 text-center md:text-left border-b border-primary/10 pb-12">
 <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary mb-6">Catálogo de Productos</h1>
 <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
 Descubrí nuestra cuidada selección de productos para nutrir tu piel y alma. Fórmulas de alta cosmética y opciones para regalar bienestar.
 </p>
 </section>

 {/* Catalog Layout */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
 
 {/* Sidebar Filters */}
 <aside className="lg:col-span-3 space-y-8">
 <div className="border-b border-primary/20 pb-4 mb-6">
 <h2 className="font-headline-md text-2xl text-primary uppercase tracking-widest">Categorías</h2>
 </div>
 
 <div className="lg:hidden">
 <CategoryDropdown categories={categories} currentCategoryId={searchParams.categoryId} />
 </div>

 {/* Desktop List */}
 <div className="hidden lg:flex flex-col gap-4 font-body-md border-l border-primary/10 pl-4">
 <Link href="/catalogo" className={`text-left transition-colors ${!searchParams.categoryId ? 'font-bold text-primary translate-x-1' : 'text-on-surface-variant hover:text-primary hover:translate-x-1'} transition-transform block`}>
 Todos
 </Link>
 
 {categories.filter(c => !c.parentId).map(parent => (
 <div key={parent.id} className="flex flex-col gap-2">
 <Link href={`/catalogo?categoryId=${parent.id}`} className={`text-left transition-colors ${searchParams.categoryId === parent.id ? 'font-bold text-primary translate-x-1' : 'text-on-surface-variant hover:text-primary hover:translate-x-1'} transition-transform block`}>
 {parent.name}
 </Link>
 {categories.filter(child => child.parentId === parent.id).map(child => (
 <Link key={child.id} href={`/catalogo?categoryId=${child.id}`} className={`text-left transition-colors text-sm ml-4 ${searchParams.categoryId === child.id ? 'font-bold text-primary translate-x-1' : 'text-on-surface-variant hover:text-primary hover:translate-x-1'} transition-transform block`}>
 ↳ {child.name}
 </Link>
 ))}
 </div>
 ))}
 </div>

 {/* Aesthetic Badge */}
 <div className="mt-12 p-6 bg-secondary-container/20 rounded-sm border border-primary/10 soft-glow hidden lg:block">
 <span className="material-symbols-outlined text-primary block mb-3 text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>auto_awesome</span>
 <h3 className="font-label-sm text-label-sm text-primary uppercase mb-2 tracking-widest">Asesoramiento</h3>
 <p className="font-body-md text-sm text-on-surface-variant">Si no sabes qué producto elegir para tu tipo de piel, contáctanos para una rutina personalizada.</p>
 </div>
 </aside>

 {/* Product Grid */}
 <div className="lg:col-span-9">
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
 {products.length === 0 && (
 <p className="col-span-full text-on-surface-variant">No hay productos en esta categoría por el momento.</p>
 )}
 {products.map((product) => (
 <article key={product.id} className="bg-surface border border-primary/10 p-6 flex flex-col product-card-hover soft-glow rounded-sm transition-transform duration-300 hover:-translate-y-2">
 <div className="aspect-[3/4] bg-surface-container-low mb-6 overflow-hidden relative rounded-sm">
 <ImageModal 
 src={product.image} 
 alt={product.title} 
 className="w-full h-full object-cover transition-transform duration-700" 
 />
 {product.isImported && (
 <div className="absolute top-4 right-4 bg-surface/80 luxury-blur px-2 py-1 rounded-full border border-primary/20 flex items-center gap-1 shadow-sm" title="Producto Importado">
 <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>flight</span>
 <span className="text-[10px] font-label-sm text-primary uppercase tracking-widest">Importado</span>
 </div>
 )}
 </div>
 <h3 className="font-headline-md text-xl text-primary mb-2">{product.title}</h3>
 <p className="font-body-md text-sm text-on-surface-variant flex-grow mb-6">{product.description}</p>
 <div className="flex justify-between items-center pt-4 border-t border-primary/10 gap-2">
 <span className="font-label-sm text-sm text-on-surface tracking-widest">
 {product.price ? `$${product.price.toFixed(2)}` : (product.tag || 'Consultar')}
 </span>
 {product.price ? (
 <AddToCartButton product={{ id: product.id, title: product.title, price: product.price, image: product.image }} />
 ) : (
 <Link href="/contacto" className="bg-primary text-on-primary px-4 py-2 font-label-sm text-[10px] uppercase tracking-widest metallic-edge hover:opacity-90 transition-opacity">
 Saber más
 </Link>
 )}
 </div>
 </article>
 ))}
 </div>
 </div>
 </div>
 </main>
 );
}
