import Link from 'next/link';

export default function Header() {
  return (
    <header className="docked full-width top-0 sticky z-[110] bg-surface/80 luxury-blur border-b border-primary/10 transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-container-max mx-auto">
        <Link href="/" className="font-headline-md text-headline-md text-primary tracking-tighter hover:opacity-80 transition-all uppercase">
          BEAUTÉ DIVINE ESPACE
        </Link>
        <div className="hidden lg:flex items-center gap-8 font-body-md text-body-md uppercase tracking-widest">
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/quien-soy">Quién Soy</Link>
          <div className="relative group">
            <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-1 whitespace-nowrap" href="/fascias">
              Fascias
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </Link>
            <div className="absolute left-0 top-full mt-2 w-64 bg-surface border border-primary/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col font-body-md normal-case tracking-normal">
              <Link href="/facial-sculpt" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Facial Sculpt</Link>
              <Link href="/fascial-fit-remodeling" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Fascial Fit Remodeling</Link>
              <Link href="/neuro-fascial-balance" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors">Neuro Fascial Balance</Link>
            </div>
          </div>
          <div className="relative group">
            <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-1 whitespace-nowrap" href="/servicios">
              Servicios
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </Link>
            <div className="absolute left-0 top-full mt-2 w-56 bg-surface border border-primary/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col font-body-md normal-case tracking-normal">
              <Link href="/tratamientos-corporales" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Tratamientos Corporales</Link>
              <Link href="/tratamientos-faciales" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Tratamientos Faciales</Link>
              <Link href="/beauty-coaching" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Beauty Coaching</Link>
              <Link href="/terapias" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors">Terapias</Link>
            </div>
          </div>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/catalogo">Catálogo</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/contacto">Contacto</Link>
        </div>
        <Link href="/contacto" className="hidden lg:inline-block bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-widest metallic-edge hover:opacity-90 active:scale-95 transition-all text-center ml-4">
          Reservar
        </Link>
      </nav>
    </header>
  );
}
