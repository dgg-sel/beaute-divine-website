import { prisma } from "@/lib/prisma";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CatalogoPage({ searchParams }: { searchParams: { categoryId?: string } }) {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  
  const whereClause = searchParams.categoryId === 'uncategorized' 
    ? { categoryId: null } 
    : searchParams.categoryId 
      ? { categoryId: searchParams.categoryId } 
      : {};

  const products = await prisma.product.findMany({ 
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: "desc" } 
  });

  return (
    <main className="pt-24 pb-section-padding max-w-container-max mx-auto px-8">
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
          
          {/* Mobile Dropdown */}
          <div className="lg:hidden">
            <select 
              className="w-full bg-surface-container-low border border-primary/20 text-primary py-3 px-4 rounded-sm font-label-sm uppercase tracking-widest outline-none focus:border-primary"
              onChange={(e) => {
                window.location.href = e.target.value;
              }}
              defaultValue={searchParams.categoryId ? `/catalogo?categoryId=${searchParams.categoryId}` : "/catalogo"}
            >
              <option value="/catalogo">Todos</option>
              {categories.map(cat => (
                <option key={cat.id} value={`/catalogo?categoryId=${cat.id}`}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Desktop List */}
          <div className="hidden lg:flex flex-col gap-4 font-body-md border-l border-primary/10 pl-4">
            <Link href="/catalogo" className={`text-left transition-colors ${!searchParams.categoryId ? 'font-bold text-primary translate-x-1' : 'text-on-surface-variant hover:text-primary hover:translate-x-1'} transition-transform block`}>
              Todos
            </Link>
            
            {categories.map(cat => (
              <Link key={cat.id} href={`/catalogo?categoryId=${cat.id}`} className={`text-left transition-colors ${searchParams.categoryId === cat.id ? 'font-bold text-primary translate-x-1' : 'text-on-surface-variant hover:text-primary hover:translate-x-1'} transition-transform block`}>
                {cat.name}
              </Link>
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
                <div className="aspect-square bg-surface-container-low mb-6 overflow-hidden relative group rounded-sm">
                  <ProductImage 
                    src={product.image.includes('http') ? product.image : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'tu_cloud_name'}/image/upload/beaute-divine-espace/catalogo/${product.image}`} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 bg-surface/80 luxury-blur px-3 py-1 rounded-full border border-primary/20">
                    <span className="text-[10px] font-label-sm text-primary uppercase tracking-widest">{product.category?.name || 'Sin Categoría'}</span>
                  </div>
                </div>
                <h3 className="font-headline-md text-xl text-primary mb-2">{product.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant flex-grow mb-6">{product.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-primary/10">
                  <span className="font-label-sm text-sm text-on-surface tracking-widest">
                    {product.price ? `$${product.price.toFixed(2)}` : (product.tag || 'Consultar')}
                  </span>
                  <button className="bg-primary text-on-primary px-4 py-2 font-label-sm text-[10px] uppercase tracking-widest metallic-edge hover:opacity-90 transition-opacity">
                    Saber más
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
