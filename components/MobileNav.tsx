"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function MobileNav() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (isMoreOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMoreOpen]);

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/90 luxury-blur border-t border-primary/20 z-[100] pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link href="/" onClick={() => setIsMoreOpen(false)} className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors gap-1 group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">home</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Inicio</span>
          </Link>
          <Link href="/servicios" onClick={() => setIsMoreOpen(false)} className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors gap-1 group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">spa</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Servicios</span>
          </Link>
          <Link href="/catalogo" onClick={() => setIsMoreOpen(false)} className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors gap-1 group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">shopping_bag</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Catálogo</span>
          </Link>
          <Link href="/contacto" onClick={() => setIsMoreOpen(false)} className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors gap-1 group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">chat_bubble</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Contacto</span>
          </Link>
          <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="flex flex-col items-center justify-center w-full h-full text-on-surface-variant hover:text-primary transition-colors gap-1 group focus:outline-none">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">{isMoreOpen ? 'close' : 'menu'}</span>
            <span className="text-[10px] font-label-sm uppercase tracking-wider">Más</span>
          </button>
        </div>
      </nav>

      <div className={`lg:hidden fixed inset-0 bg-surface z-[90] flex flex-col pt-24 px-8 transition-all duration-300 overflow-y-auto pb-32 ${isMoreOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
        <div className="flex flex-col gap-6 font-headline-md text-2xl text-on-surface">
          <Link href="/quien-soy" onClick={() => setIsMoreOpen(false)} className="hover:text-primary transition-colors border-b border-primary/10 pb-4">Quién Soy</Link>
          
          <div className="flex flex-col gap-4 border-b border-primary/10 pb-4">
            <span className="text-primary font-bold text-xl uppercase tracking-widest text-sm">Fascias</span>
            <div className="flex flex-col gap-3 pl-4 text-lg font-body-md">
              <Link href="/facial-sculpt" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Facial Sculpt</Link>
              <Link href="/fascial-fit-remodeling" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Fascial Fit Remodeling</Link>
              <Link href="/neuro-fascial-balance" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Neuro Fascial Balance</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b border-primary/10 pb-4">
            <span className="text-primary font-bold text-xl uppercase tracking-widest text-sm">Servicios</span>
            <div className="flex flex-col gap-3 pl-4 text-lg font-body-md">
              <Link href="/tratamientos-corporales" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Tratamientos Corporales</Link>
              <Link href="/tratamientos-faciales" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Tratamientos Faciales</Link>
              <Link href="/beauty-coaching" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Beauty Coaching</Link>
              <Link href="/terapias" onClick={() => setIsMoreOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors block py-2">Terapias</Link>
            </div>
          </div>
          
          <div className="pt-2">
            {session ? (
              <Link href="/perfil" onClick={() => setIsMoreOpen(false)} className="hover:text-primary transition-colors block border-t border-primary/10 pt-4 text-primary font-bold">
                Mi Cuenta
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsMoreOpen(false)} className="hover:text-primary transition-colors block border-t border-primary/10 pt-4 text-primary font-bold">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
