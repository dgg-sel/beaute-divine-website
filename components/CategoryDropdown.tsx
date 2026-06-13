"use client";

import { useRouter } from "next/navigation";

export default function CategoryDropdown({ 
  categories, 
  currentCategoryId 
}: { 
  categories: { id: string, name: string }[], 
  currentCategoryId?: string 
}) {
  const router = useRouter();

  return (
    <select 
      className="w-full bg-surface-container-low border border-primary/20 text-primary py-3 px-4 rounded-sm font-label-sm uppercase tracking-widest outline-none focus:border-primary"
      onChange={(e) => {
        router.push(e.target.value);
      }}
      defaultValue={currentCategoryId ? `/catalogo?categoryId=${currentCategoryId}` : "/catalogo"}
    >
      <option value="/catalogo">Todos</option>
      {categories.map(cat => (
        <option key={cat.id} value={`/catalogo?categoryId=${cat.id}`}>{cat.name}</option>
      ))}
    </select>
  );
}
