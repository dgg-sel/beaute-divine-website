import Link from 'next/link';

export default function TratamientosFacialesPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Tratamientos Faciales</h1>
 <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiXFITE8vL3AVu4-sthOehTURWgkZnU14PZKzS31pH4wkzXtUz6F94Erlu0r8cHvby2Ei0HkHiiZdDwV4Djlj-veWR0NtOmSf7KuIGcxJyZXL8nHZhXwZzuXzsSCl35He85rs8_t2NQWvm7mLCQbPc3PJTN7TcW3JahPwBX2HZcE5OFkdkvJU1CHQLgsPSuu1vVxxq5E-1KWqSXrT2UBUvO5ZEtJcNPoIAfj4xITUm4dkWKrXjRN6Jm7e2_FD7GKd9quzAOcyuVwo" alt="Tratamientos Faciales" />
 </div>
 </section>

 {/* Services Grid */}
 <section className="max-w-container-max mx-auto px-8 mb-section-padding">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">LIMPIEZA FACIAL PROFUNDA</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Purifica, hidrata y devuelve luminosidad a la piel.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">LIMPIEZA FACIAL EXPRESS</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Renueva y revitaliza la piel en minutos.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">FACIAL SCULPT™️</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Reafirma, redefine y rejuvenece el rostro.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">DETOX & LIFTING SHOCK</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Limpieza, luminosidad y efecto lifting inmediatos.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">TRATAMIENTO PARA ACNÉ</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Purifica, calma y ayuda a recuperar el equilibrio de la piel.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">TRATAMIENTO PARA ROSÁCEA</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Calma, fortalece y devuelve confort a la piel.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">PEELING</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Renueva la piel y potencia su luminosidad.</p>
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
