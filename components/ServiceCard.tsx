'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  longDescription: React.ReactNode;
  imageSrc?: string;
  id?: string;
}

export default function ServiceCard({ title, shortDescription, longDescription, imageSrc, id }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <>
      <div id={id} className="bg-surface-container-low gold-border p-8 service-card flex flex-col h-full scroll-mt-32">
        {imageSrc && (
          <div className="mb-6 -mx-4 -mt-4 overflow-hidden shadow-md">
            <img src={imageSrc} alt={title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        )}
        <h3 className="font-headline-md text-headline-md mb-4 text-primary">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant grow">{shortDescription}</p>
        <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="font-label-sm text-[10px] uppercase text-primary tracking-widest hover:text-primary/70 transition-colors border border-primary/20 px-3 py-1.5"
          >
            Más Info
          </button>
          <Link 
            href="/contacto" 
            className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors px-3 py-1.5"
          >
            Consultar
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-surface gold-border w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Cerrar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
              <h3 className="font-headline-lg text-headline-md md:text-headline-lg mb-6 text-primary pr-8">{title}</h3>
              <div className="font-body-md text-body-md text-on-surface-variant space-y-4">
                {longDescription}
              </div>
            </div>
            <div className="p-6 md:p-8 border-t border-primary/10 bg-surface-container-low flex justify-end">
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-primary text-white font-label-sm text-[10px] uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
               >
                 Cerrar
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
