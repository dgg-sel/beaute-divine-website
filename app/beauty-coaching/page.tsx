import Link from 'next/link';

export default function BeautyCoachingPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
        <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Beauty Coaching</h1>
        <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQKWZVloZOQO1n-RaSGbSWUkWPw730bY0dpQ4bMPBM72CyDl0J0CgL8YlpVkzi-OTmZT4QRq3vYu6TpXPzAsm861Qlv66X4PGcDPXpJLovFnwwFU8yvC8lMreTAMcd7IxFQk9eP_SGXZ4JNWJ8JDDC-_tAx2CMcLMlnJirgwo1ZatlWhV9FvGZPunSiF6bjb28gnFDUmECqgoOepYjsgqBUvCOUk0NLAph5GIn09nol9ndsxpjaREJw8hxwvXWIbzs_UZ_SCqW1sc" alt="Beauty Coaching" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-container-max mx-auto px-8 mb-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
            <h3 className="font-headline-md text-headline-md mb-4 text-primary">Beauty Coaching</h3>
            <p className="font-body-md text-body-md text-on-surface-variant grow">Diagnóstico, rutina personalizada y guía profesional para tu piel.</p>
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
