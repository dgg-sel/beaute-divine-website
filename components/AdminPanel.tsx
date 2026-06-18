"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addCategory, deleteCategory, addProduct, editProduct, deleteProduct } from "@/app/admin/actions";
import type { Product, Category } from "@prisma/client";
import ProductImage from "@/components/ProductImage";
import AdminCustomerTab, { UserWithOrders } from "./AdminCustomerTab";
import { CldUploadWidget } from "next-cloudinary";

type ProductWithCategory = Product & { category: Category | null };

export default function AdminPanel({ products, categories, users }: { products: ProductWithCategory[], categories: Category[], users: UserWithOrders[] }) {
  const [activeTab, setActiveTab] = useState<"CATALOGO" | "CLIENTES">("CATALOGO");
  const [editingProduct, setEditingProduct] = useState<ProductWithCategory | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const router = useRouter();

  const handleAddCategory = async (formData: FormData) => {
    setCategoryError(null);
    const result = await addCategory(formData);
    if (result?.error) {
      setCategoryError(result.error);
    } else {
      // Clear the input on success
      const form = document.getElementById("add-category-form") as HTMLFormElement;
      if (form) form.reset();
      router.refresh();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      await deleteCategory(id);
      router.refresh();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      await deleteProduct(id);
      router.refresh();
    }
  };

  const openNewProductModal = () => {
    setEditingProduct(null);
    setUploadedImageId("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: ProductWithCategory) => {
    setEditingProduct(p);
    setUploadedImageId(p.image || "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadedImageId) {
      alert("Por favor selecciona una imagen.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    try {
      if (editingProduct) {
        await editProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      closeModal();
      router.refresh();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-8 border-b border-primary/20 pb-4">
        <button 
          onClick={() => setActiveTab("CATALOGO")}
          className={`font-label-sm uppercase tracking-widest px-4 py-2 transition-colors ${activeTab === "CATALOGO" ? "bg-primary text-on-primary" : "text-primary hover:bg-primary/10"}`}
        >
          Catálogo
        </button>
        <button 
          onClick={() => setActiveTab("CLIENTES")}
          className={`font-label-sm uppercase tracking-widest px-4 py-2 transition-colors ${activeTab === "CLIENTES" ? "bg-primary text-on-primary" : "text-primary hover:bg-primary/10"}`}
        >
          Clientes y Ventas
        </button>
      </div>

      {activeTab === "CATALOGO" && (
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col gap-8">
        {/* Categories Section */}
        <section className="bg-surface-container-low p-6 rounded-sm soft-glow border border-primary/10">
          <h2 className="font-headline-md text-2xl mb-4 text-primary">Categorías</h2>
          <form id="add-category-form" action={handleAddCategory} className="flex flex-col gap-2 mb-4">
            <input name="name" placeholder="Nueva Categoría" required className="input-elegant py-2 flex-grow" />
            <div className="flex gap-2">
              <select name="parentId" className="input-elegant py-2 flex-grow bg-transparent text-sm">
                <option value="none">Principal (Sin padre)</option>
                {categories.filter(c => !c.parentId).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <button type="submit" className="bg-primary text-on-primary px-4 font-label-sm uppercase tracking-widest whitespace-nowrap">Crear</button>
            </div>
            {categoryError && <p className="text-red-500 text-xs font-label-sm">{categoryError}</p>}
          </form>
          <ul className="flex flex-col gap-2 pr-2">
            {categories.filter(c => !c.parentId).map(parent => (
              <div key={parent.id} className="flex flex-col gap-1">
                <li className="flex justify-between items-center text-sm p-2 bg-surface border border-primary/10 rounded-sm font-bold">
                  {parent.name}
                  <button onClick={() => handleDeleteCategory(parent.id)} className="text-red-500 hover:text-red-700 material-symbols-outlined text-sm">delete</button>
                </li>
                {categories.filter(child => child.parentId === parent.id).map(child => (
                  <li key={child.id} className="flex justify-between items-center text-sm p-2 ml-4 bg-surface-container border border-primary/5 rounded-sm">
                    ↳ {child.name}
                    <button onClick={() => handleDeleteCategory(child.id)} className="text-red-500 hover:text-red-700 material-symbols-outlined text-sm">delete</button>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </section>
      </div>

      {/* Products List Section */}
      <div className="lg:col-span-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-3xl text-primary">Lista de Productos ({products.length})</h2>
          <button onClick={openNewProductModal} className="bg-primary text-on-primary py-2 px-6 font-label-sm uppercase tracking-widest">
            + Nuevo Producto
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 max-h-[800px] overflow-y-auto pr-2">
          {products.map(p => (
            <div key={p.id} className="bg-surface p-4 border border-primary/10 soft-glow rounded-sm flex gap-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <ProductImage 
                  src={p.image}
                  alt={p.title} 
                  className="w-24 h-24 object-cover rounded-sm border border-primary/10" 
                />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg leading-tight line-clamp-1 flex items-center gap-2" title={p.title}>
                    {p.title}
                    {p.isImported && <span className="material-symbols-outlined text-sm text-primary" title="Importado">flight</span>}
                  </h3>
                </div>
                <div className="mb-2">
                  <span className="text-[10px] bg-secondary-container/30 px-2 py-1 rounded-full text-primary whitespace-nowrap">
                    {p.category?.name || 'Sin Categoría'}
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mb-2 line-clamp-2 flex-grow">{p.description}</p>
                
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-primary/10">
                  <div className="font-label-sm text-sm">${p.price} | Stock: {p.stock}</div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(p)} className="text-primary hover:opacity-70 material-symbols-outlined">edit</button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-700 material-symbols-outlined">delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup for Product Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface p-8 rounded-sm soft-glow border border-primary/20 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-2xl text-primary">
                {editingProduct ? 'Editar Producto' : 'Crear Producto'}
              </h2>
              <button onClick={closeModal} className="text-on-surface-variant hover:text-primary material-symbols-outlined">close</button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input name="title" defaultValue={editingProduct?.title} placeholder="Título" required className="input-elegant py-2" />
              <textarea name="description" defaultValue={editingProduct?.description} placeholder="Descripción" required className="input-elegant py-2" rows={3}></textarea>
              
              <select name="categoryId" defaultValue={editingProduct?.categoryId || "none"} className="input-elegant py-2 bg-transparent">
                <option value="none">Sin Categoría</option>
                {categories.filter(c => !c.parentId).map(parent => {
                  const children = categories.filter(child => child.parentId === parent.id);
                  if (children.length === 0) {
                    return <option key={parent.id} value={parent.id}>{parent.name}</option>;
                  }
                  return (
                    <optgroup key={parent.id} label={parent.name}>
                      <option value={parent.id}>{parent.name} (Principal)</option>
                      {children.map(child => (
                        <option key={child.id} value={child.id}>- {child.name}</option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-on-surface-variant font-label-sm uppercase tracking-widest">
                  Foto del Producto
                </label>
                
                {uploadedImageId && (
                  <div className="mb-2 relative w-24 h-24 border border-primary/20 rounded-sm overflow-hidden bg-surface-container-low">
                    <ProductImage src={uploadedImageId} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result) => {
                    if (typeof result.info === 'object' && result.info !== null) {
                      setUploadedImageId(result.info.public_id);
                    }
                  }}
                >
                  {({ open }) => {
                    return (
                      <button type="button" onClick={() => open()} className="border border-primary text-primary hover:bg-primary/5 py-2 px-4 font-label-sm uppercase tracking-widest text-sm text-center">
                        {uploadedImageId ? 'Cambiar Imagen' : 'Elegir Imagen'}
                      </button>
                    );
                  }}
                </CldUploadWidget>
                
                <input type="hidden" name="existingImage" value={uploadedImageId} />
              </div>

              <div className="flex gap-4">
                <input name="price" defaultValue={editingProduct?.price || ''} placeholder="Precio" type="number" step="0.01" className="input-elegant py-2 w-1/2" />
                <input name="stock" defaultValue={editingProduct?.stock || ''} placeholder="Stock" type="number" required className="input-elegant py-2 w-1/2" />
              </div>
              
              <input name="tag" defaultValue={editingProduct?.tag || ''} placeholder="Etiqueta (ej: Consultar)" className="input-elegant py-2" />
              
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input 
                  type="checkbox" 
                  name="isImported" 
                  defaultChecked={editingProduct?.isImported || false} 
                  className="w-4 h-4 text-primary border-primary/20 rounded focus:ring-primary focus:ring-offset-surface-container"
                />
                <span className="text-sm text-on-surface">Marcar como "Producto Importado"</span>
              </label>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-primary/10">
                <button type="button" onClick={closeModal} className="border border-primary text-primary py-3 px-4 font-label-sm uppercase tracking-widest w-1/3">
                  Cancelar
                </button>
                <button type="submit" disabled={isUploading} className="bg-primary text-on-primary py-3 px-4 font-label-sm uppercase tracking-widest flex-grow disabled:opacity-50">
                  {isUploading ? 'Subiendo Foto...' : editingProduct ? 'Guardar Cambios' : 'Agregar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* End of Catalogo Tab */}
      </div>
      )}

      {activeTab === "CLIENTES" && (
        <AdminCustomerTab users={users} products={products} />
      )}
    </div>
  );
}
