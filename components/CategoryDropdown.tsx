"use client";

import { useRouter } from "next/navigation";

export default function CategoryDropdown({ 
  categories, 
  currentCategoryId 
}: { 
  categories: { id: string, name: string, parentId?: string | null }[], 
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
      {categories.filter(c => !c.parentId).map(parent => {
        const children = categories.filter(child => child.parentId === parent.id);
        if (children.length === 0) {
          return <option key={parent.id} value={`/catalogo?categoryId=${parent.id}`}>{parent.name}</option>;
        }
        return (
          <optgroup key={parent.id} label={parent.name}>
            <option value={`/catalogo?categoryId=${parent.id}`}>Ver todo en {parent.name}</option>
            {children.map(child => (
              <option key={child.id} value={`/catalogo?categoryId=${child.id}`}>- {child.name}</option>
            ))}
          </optgroup>
        );
      })}
    </select>
  );
}
