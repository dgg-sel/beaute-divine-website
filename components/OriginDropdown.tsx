"use client";

import { useRouter } from "next/navigation";

export default function OriginDropdown({ 
  currentCategoryId,
  currentImported 
}: { 
  currentCategoryId?: string,
  currentImported?: string 
}) {
  const router = useRouter();
  const qsCat = currentCategoryId ? `&categoryId=${currentCategoryId}` : '';
  const base = currentCategoryId ? `/catalogo?categoryId=${currentCategoryId}` : `/catalogo`;

  return (
    <select 
      className="w-full bg-surface-container-low border border-primary/20 text-primary py-3 px-4 rounded-sm font-label-sm uppercase tracking-widest outline-none focus:border-primary"
      onChange={(e) => {
        router.push(e.target.value);
      }}
      defaultValue={currentImported ? `/catalogo?imported=${currentImported}${qsCat}` : base}
    >
      <option value={base}>Todos los orígenes</option>
      <option value={`/catalogo?imported=true${qsCat}`}>Importados</option>
      <option value={`/catalogo?imported=false${qsCat}`}>Nacionales</option>
    </select>
  );
}
