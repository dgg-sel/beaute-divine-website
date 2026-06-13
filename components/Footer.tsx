import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-surface-container-low border-t border-primary/20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-container-max mx-auto gap-8">
          <div className="flex flex-col gap-2 mb-8 md:mb-0 text-center md:text-left">
            <div className="font-headline-md text-2xl text-primary uppercase">BEAUTÉ DIVINE ESPACE</div>
            <p className="font-body-md text-on-surface-variant max-w-xs text-sm">Una mirada consciente de la belleza.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-label-sm text-label-sm uppercase tracking-widest">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://youtube.com/@beautedivineespace" target="_blank" rel="noreferrer">YouTube</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://instagram.com/beautedivine" target="_blank" rel="noreferrer">Instagram</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="https://facebook.com/beautedivine" target="_blank" rel="noreferrer">Facebook</a>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/privacidad">Privacidad</Link>
          </div>
          <div className="text-on-surface-variant font-body-md text-xs opacity-70 text-center md:text-right">
            © 2026 Beauté Divine Espace. Todos los derechos reservados. <br/>
            Diseñado por DGG Diseños
          </div>
        </div>
      </footer>
      <a className="fixed bottom-24 lg:bottom-8 right-8 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-[100]" href="https://wa.me/5491144133627" target="_blank" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </>
  );
}
