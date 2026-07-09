"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";
import ProductImage from "./ProductImage";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export default function ImageModal({ src, alt, className, description, price, stock }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(p);
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)} 
        className="cursor-pointer h-full w-full relative group/modal"
      >
        <ProductImage src={src} alt={alt} className={className || ""} />
        <div className="absolute inset-0 bg-black/0 group-hover/modal:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-white/80 p-3 rounded-full opacity-0 group-hover/modal:opacity-100 transform scale-75 group-hover/modal:scale-100 transition-all duration-300 shadow-lg">
            <ZoomIn className="w-6 h-6 text-[#4A4238]" />
          </div>
        </div>
      </div>

      {mounted && isOpen && typeof window !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 md:p-8 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/80 z-10"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className={`relative w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row items-center justify-center animate-in zoom-in-95 duration-300 overflow-hidden ${description ? 'bg-surface rounded-2xl shadow-2xl' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
             {/* Left/Top: Image */}
             <div className={`relative flex items-center justify-center ${description ? 'w-full md:w-1/2 h-[40vh] md:h-[80vh] bg-surface-container-low p-4' : 'w-full h-[80vh]'}`}>
               <ProductImage 
                 src={src} 
                 alt={alt} 
                 className={`w-full h-full object-contain ${!description ? 'rounded-lg shadow-2xl' : ''}`} 
               />
             </div>

             {/* Right/Bottom: Details */}
             {description && (
               <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] p-6 md:p-10 flex flex-col overflow-y-auto bg-surface">
                 <h2 className="font-headline-md text-2xl md:text-3xl text-primary mb-4 pr-8">{alt}</h2>
                 
                 {price ? (
                   <div className="mb-6 pb-6 border-b border-outline-variant">
                     <span className="font-label-sm text-lg text-on-surface tracking-widest">{formatPrice(price)}</span>
                     <p className="text-xs text-on-surface-variant/70 mt-1">${(price / 1.21).toFixed(2)} sin impuestos</p>
                   </div>
                 ) : null}

                 {stock !== undefined && (
                   <div className="mb-6 flex items-center gap-2">
                     <span className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-[#c49e62]' : 'bg-error'}`}></span>
                     <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">
                       {stock > 0 ? `${stock} unidades disponibles` : 'Agotado'}
                     </span>
                   </div>
                 )}

                 <div className="font-body-md text-on-surface-variant whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                   {description}
                 </div>
               </div>
             )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
