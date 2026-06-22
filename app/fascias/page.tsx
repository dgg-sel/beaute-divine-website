import Link from 'next/link';

export default function FasciasPage() {
 return (
 <main>
 <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
 <div className="absolute inset-0 z-0">
 <img className="w-full h-full object-cover" data-alt="A serene high-end spa treatment room with soft sunlight streaming through linen curtains. The atmosphere is ethereal and calming, featuring a minimalist massage table, soft gold accents on the walls, and a palette of warm off-whites and light wood tones. The focus is on luxury and professional holistic wellness in a modern Argentine setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSR_ThDa3izW0_2tcfejvho2vMpxSIEE5vPvKzwNu6oMSV1ad1EuUnHx_7kkXF69GXxX8Yi7Kl_tQB443DfvsoKznXlDeobmNGWEzzB8R6MwWrVlUdJ7V1EwrpC2qun2AEjx3YQ_iTLhBjepWIgcJqXQHBZyFTstjrWD_SAThTlnzZ13qCD5VZN8JiX3SrzaBEk_UZl5_veEp0o_f5qRG99awYGVmOM9wOEHN2ulSNnFCcKcTLuUHwhtjWqrRtEkj9GtN8EuDmkko" />
 <div className="absolute inset-0 hero-gradient"></div>
 </div>
  <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full overflow-hidden">
    <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-6 block opacity-0 translate-y-4 animate-[fadeInUp_1s_ease_forwards]">Exclusividad en Argentina</span>
    <h1 className="font-headline-lg text-5xl md:text-display-lg text-on-surface mb-8 opacity-0 translate-y-4 animate-[fadeInUp_1s_0.2s_ease_forwards] break-words">Neurofascial</h1>
    <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto opacity-0 translate-y-4 animate-[fadeInUp_1s_0.4s_ease_forwards]">
      Tratamientos de nueva generación que integran trabajo miofascial, biomecánica, osteopatía y kinesiología para abordar el cuerpo y el rostro desde su estructura, favoreciendo el equilibrio, la postura, la movilidad y la armonía natural de los tejidos.
    </p>
    <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-4 animate-[fadeInUp_1s_0.6s_ease_forwards] w-full max-w-xs mx-auto sm:max-w-none">
      <Link className="bg-primary text-on-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:opacity-90 transition-all w-full sm:w-auto" href="#booking">Reservar Sesión</Link>
    </div>
 </div>
 </header>


 {/* CTA Section */}
 <section className="py-[120px] px-8 text-center bg-surface" id="booking">
 <div className="max-w-2xl mx-auto">
 <h2 className="font-headline-lg text-headline-lg mb-6">Comienza tu transformación hoy.</h2>
 <p className="font-body-md text-body-md text-on-surface-variant mb-12">
 Reserva tu cita para una evaluación personalizada y descubre los beneficios de nuestros tratamientos.
 </p>
 <form action="https://formsubmit.co/marcelahilu@hotmail.com" method="POST" className="space-y-8 text-left max-w-md mx-auto mb-12">
 <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Beauté Divine" />
 <input type="hidden" name="_template" value="table" />
 <div>
 <label className="font-label-sm text-label-sm text-primary mb-2 block">Nombre Completo</label>
 <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:ring-0 focus:border-primary transition-colors py-3 px-0 placeholder:text-on-surface-variant/40" placeholder="Ej: Martina Rossi" type="text" />
 </div>
 <div>
 <label className="font-label-sm text-label-sm text-primary mb-2 block">Email de Contacto</label>
 <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:ring-0 focus:border-primary transition-colors py-3 px-0 placeholder:text-on-surface-variant/40" placeholder="martina@ejemplo.com" type="email" name="email" />
 </div>
 <button className="w-full bg-primary text-on-primary py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all mt-4" type="submit">
 Solicitar Turno
 </button>
 </form>
 <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">Ubicado en Palermo Soho, Buenos Aires.</p>
 </div>
 </section>
 </main>
 );
}
