import Link from 'next/link';

export default function TerapiasPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
        <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Terapias</h1>
        <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-vUuP7IUbrEwCNZCLOTV6gF_iiOzHnia3r430O5gVIu10dgZrIi9L80EXJpGj5sfhFNhTDGvu8jENga1e7Y2gFHOTeuyCjIZZuohm_XHAcdBoZVFRRMFtSqmveONIhljgWav8AnKYYJyQa-yQSsKtxT5_LuhwQOdxUB7SDWaFy42naiFGTfaW9gKKYmF1HIHIvW_ForWRWFlbUz8ijpoI0nRqhPaq7zRV27HKaVQGS8WpyCieoGX-EBZ2CPeqdkft7PhKtsZB-ns" alt="Terapias" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-container-max mx-auto px-8 mb-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">SOUND HEALING MASSAGE</h3>
            <p className="font-body-md text-body-md text-on-surface-variant grow">Masaje y sonidos sagrados para armonizar cuerpo, mente y emociones.</p>
            <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
              <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
            </div>
          </div>

          <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">SAINT-TOUCHE™️</h3>
            <p className="font-body-md text-body-md text-on-surface-variant grow">Canalización energética a través de las manos para acompañar procesos de sanación integral.</p>
            <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
              <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
            </div>
          </div>

          <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">LECTURA DE REGISTROS AKÁSHICOS</h3>
            <p className="font-body-md text-body-md text-on-surface-variant grow">Una guía de autoconocimiento para comprender tu camino y tu presente.</p>
            <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
              <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
            </div>
          </div>

          <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">TAMEANA</h3>
            <p className="font-body-md text-body-md text-on-surface-variant grow">Armonización vibracional con cristales para elevar tu frecuencia y acompañar procesos de transformación.</p>
            <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
              <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
            </div>
          </div>

          <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">THETAHEALING®️</h3>
            <p className="font-body-md text-body-md text-on-surface-variant grow">Transformación de creencias y patrones para impulsar cambios en tu vida.</p>
            <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
              <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-section-padding overflow-hidden">
        <div className="absolute inset-0 bg-primary-container/10"></div>
        <div className="relative max-w-4xl mx-auto px-8 text-center bg-surface/40 backdrop-blur-md p-16 gold-border">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">Reservá tu experiencia</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
            Estoy lista para guiarte en tu transformación física, mental y almica!<br />
            Dejame tus datos y te contactaré para agendar una consulta personalizada.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/contacto" className="bg-primary text-white px-10 py-4 font-label-sm text-label-sm uppercase hover:opacity-90 transition-all">Contactar</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
