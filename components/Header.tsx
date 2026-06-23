import Link from 'next/link';
import CartDrawer from './CartDrawer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email.toLowerCase());

  return (
    <header className="docked full-width top-0 sticky z-[110] bg-surface/80 luxury-blur border-b border-primary/10 transition-all duration-300">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-container-max mx-auto">
        <Link href="/" className="font-headline-md text-headline-sm text-primary tracking-tighter hover:opacity-80 transition-all uppercase whitespace-nowrap shrink-0 mr-4">
          BEAUTÉ DIVINE ESPACE
        </Link>
        <div className="hidden lg:flex items-center gap-5 font-body-md text-sm uppercase tracking-widest flex-1 justify-center">
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/quien-soy">Quién Soy</Link>
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
          <div className="relative group">
            <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300 flex items-center gap-1 whitespace-nowrap" href="/fascias">
              Neurofascial
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </Link>
            <div className="absolute left-0 top-full mt-2 w-64 bg-surface border border-primary/10 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col font-body-md normal-case tracking-normal">
              <Link href="/fascias#facial-sculpt" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Facial Sculpt</Link>
              <Link href="/fascias#fascial-fit-remodeling" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors border-b border-primary/5">Fascial Fit Remodeling</Link>
              <Link href="/fascias#neuro-fascial-balance" className="px-4 py-3 text-sm text-on-surface-variant hover:bg-secondary-container/20 hover:text-primary transition-colors">Neuro Fascial Balance</Link>
            </div>
          </div>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/catalogo">Catálogo</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors duration-300" href="/contacto">Contacto</Link>
        </div>
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {isAdmin && (
            <Link href="/admin" className="font-body-md text-sm uppercase tracking-widest text-[#D4AF37] hover:opacity-80 transition-opacity duration-300 whitespace-nowrap">
              Admin
            </Link>
          )}
          {session ? (
            <Link href="/perfil" className="font-body-md text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300 whitespace-nowrap">
              Mi Cuenta
            </Link>
          ) : (
            <Link href="/login" className="font-body-md text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300 whitespace-nowrap">
              Iniciar Sesión
            </Link>
          )}
          <CartDrawer />
          <Link href="/contacto" className="bg-primary text-on-primary px-8 py-3 font-label-sm text-label-sm uppercase tracking-widest metallic-edge hover:opacity-90 active:scale-95 transition-all text-center">
            Reservar
          </Link>
        </div>
        
        {/* Mobile Cart */}
        <div className="flex lg:hidden items-center ml-auto">
          <CartDrawer />
        </div>
      </nav>
    </header>
  );
}
