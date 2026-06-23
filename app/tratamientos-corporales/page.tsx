import Link from 'next/link';

export default function TratamientosCorporalesPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Tratamientos Corporales</h1>
 <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCldpHOlSF7D2lKs5wNNfNwtlpES5OKxWg9uVJO1ANYy3HU8qgbb5x2dtPpB_QZSxER4nPocOz5Dh51zJwlFr_PFumOmCbk2VuxnWY8wUPrVHu-AXk_hrM8vzRUchvrjot2sC54GU2LtYsf7uiOP3e4eR2PvFxlCemNUTqNG0w5tlIhZrfSB3AQnDInld2XIinbnl55mcNXSPSj6CzkmrQAfrRr9XsdVeUPYccXoek6SEZ7PmqsX3H94HrBUVf4z8ylP2FsFIeqfYg" alt="Tratamientos Corporales" />
 </div>
 </section>

 {/* Services Grid */}
 <section className="max-w-container-max mx-auto px-8 mb-section-padding">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Masaje Descontracturante de Cuello y Espalda</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Alivia dolores y libera tensiones en cuello, hombros y espalda.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Masaje Descontracturante Corporal</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Reduce contracturas y devuelve bienestar a todo el cuerpo.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Masaje Sedativo</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Relajación profunda para cuerpo y mente.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Neurofascial Balance™️</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Recupera movilidad, bienestar y equilibrio corporal.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Drenaje Linfático Corporal</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Reduce la retención de líquidos y promueve ligereza corporal.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Drenaje Linfático de Miembros Inferiores</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Alivia la pesadez de las piernas y favorece una sensación de liviandad.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Fascial Fit Remodeling™️</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Remodela la silueta desde un abordaje fascial y funcional.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Relax & Drain</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Alivio muscular y ligereza corporal en una sola sesión.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Presoterapia Secuencial</h3>
 <p className="font-body-md text-body-md text-on-surface-variant grow">Estimula la circulación y ayuda a reducir la retención de líquidos.</p>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Day Spa</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Una experiencia integral de bienestar, recuperación corporal y revitalización facial</p>
   <p>Day Spa es una experiencia diseñada para quienes desean regalarse un momento de cuidado profundo, combinando bienestar corporal y revitalización facial en una misma sesión.</p>
   <p>La experiencia incluye un masaje descontracturante corporal completo para liberar tensiones musculares, una sesión de presoterapia secuencial que favorece la circulación y la sensación de ligereza en las piernas, y un masaje facial rejuvenecedor orientado a revitalizar la expresión, mejorar la luminosidad de la piel y favorecer una apariencia más descansada.</p>
   <p>La combinación de estas técnicas permite disfrutar de una experiencia completa de relajación, recuperación corporal y cuidado facial, favoreciendo una sensación integral de bienestar.</p>
   <p>Más que un tratamiento, Day Spa es una invitación a hacer una pausa, reconectar con uno mismo y dedicar un tiempo de calidad al cuidado personal.</p>
   <p>Ideal para quienes desean desconectar del estrés cotidiano, recuperar energía y disfrutar de una experiencia completa de bienestar y autocuidado.</p>
 </div>
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
