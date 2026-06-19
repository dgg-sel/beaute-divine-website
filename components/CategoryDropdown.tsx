"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function CategoryDropdown({ 
  categories, 
  currentCategoryId,
  currentImported
}: { 
  categories: { id: string, name: string, parentId?: string | null }[], 
  currentCategoryId?: string,
  currentImported?: string
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const qsImported = currentImported ? `&imported=${currentImported}` : '';
  const base = currentImported ? `/catalogo?imported=${currentImported}` : `/catalogo`;

  // Build a flat list of options for rendering and finding current label
  const flatOptions: { value: string, label: string, isHeader?: boolean, isIndented?: boolean }[] = [];
  flatOptions.push({ value: base, label: "Todas las categorías" });

  categories.filter(c => !c.parentId).forEach(parent => {
    const children = categories.filter(child => child.parentId === parent.id);
    if (children.length === 0) {
      flatOptions.push({ value: `/catalogo?categoryId=${parent.id}${qsImported}`, label: parent.name });
    } else {
      flatOptions.push({ value: `/catalogo?categoryId=${parent.id}${qsImported}`, label: `Ver todo en ${parent.name}`, isHeader: true });
      children.forEach(child => {
        flatOptions.push({ value: `/catalogo?categoryId=${child.id}${qsImported}`, label: child.name, isIndented: true });
      });
    }
  });

  const currentOptionValue = currentCategoryId ? `/catalogo?categoryId=${currentCategoryId}${qsImported}` : base;
  const currentOptionLabel = flatOptions.find(o => o.value === currentOptionValue)?.label || "Todas las categorías";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface border border-primary/20 text-on-surface-variant py-3 px-4 rounded-sm font-label-sm uppercase tracking-widest text-[11px] outline-none focus:border-primary flex justify-between items-center shadow-sm hover:bg-surface-variant/30 transition-colors"
      >
        <span className="truncate mr-2">{currentOptionLabel.replace('Ver todo en ', '')}</span>
        <span className="material-symbols-outlined text-[20px] transition-transform duration-300 shrink-0" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          expand_more
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-[60] w-full mt-1 bg-surface border border-primary/20 rounded-sm shadow-xl max-h-[300px] overflow-y-auto soft-glow animate-fade-in">
          <ul className="flex flex-col py-2">
            {flatOptions.map((option) => (
              <li key={`${option.value}-${option.label}`}>
                <button
                  className={`w-full text-left py-2.5 font-label-sm uppercase tracking-widest text-[11px] transition-colors hover:bg-secondary-container/30 
                    ${option.isHeader ? 'px-4 text-primary font-bold bg-primary/5 mt-2 border-t border-primary/10 pt-3' : option.isIndented ? 'px-8 text-on-surface-variant hover:text-on-surface' : 'px-4 text-on-surface-variant hover:text-on-surface'}
                    ${currentOptionValue === option.value && !option.isHeader ? 'text-on-surface bg-secondary-container/30 font-bold' : ''}
                  `}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(option.value);
                  }}
                >
                  {option.isIndented ? `↳ ${option.label}` : option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
