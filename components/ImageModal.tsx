"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn } from "lucide-react";
import ProductImage from "./ProductImage";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageModal({ src, alt, className }: ImageModalProps) {
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
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full hover:bg-black/80"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
             <ProductImage 
               src={src} 
               alt={alt} 
               className="w-full h-full object-contain rounded-lg shadow-2xl" 
             />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
