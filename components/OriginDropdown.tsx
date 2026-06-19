"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function OriginDropdown({ 
  currentCategoryId,
  currentImported 
}: { 
  currentCategoryId?: string,
  currentImported?: string 
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const qsCat = currentCategoryId ? `&categoryId=${currentCategoryId}` : '';
  const base = currentCategoryId ? `/catalogo?categoryId=${currentCategoryId}` : `/catalogo`;

  const options = [
    { value: base, label: "Todos los orígenes" },
    { value: `/catalogo?imported=true${qsCat}`, label: "Importados" },
    { value: `/catalogo?imported=false${qsCat}`, label: "Nacionales" },
  ];

  const currentOptionValue = currentImported ? `/catalogo?imported=${currentImported}${qsCat}` : base;
  const currentOptionLabel = options.find(o => o.value === currentOptionValue)?.label || "Todos los orígenes";

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
        <span>{currentOptionLabel}</span>
        <span className="material-symbols-outlined text-[20px] transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          expand_more
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute z-[60] w-full mt-1 bg-surface border border-primary/20 rounded-sm shadow-xl max-h-60 overflow-y-auto soft-glow animate-fade-in">
          <ul className="flex flex-col py-1">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  className={`w-full text-left px-4 py-2.5 font-label-sm uppercase tracking-widest text-[11px] transition-colors hover:bg-secondary-container/30 ${currentOptionValue === option.value ? 'text-on-surface bg-secondary-container/30 font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(option.value);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
