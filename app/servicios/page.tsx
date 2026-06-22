import Link from 'next/link';
import imgCorp from '@/img/Tratamientos Corporales.jpeg';
import imgFacial from '@/img/Tratamientos Faciales.jpeg';
import imgTerapias from '@/img/Terapias.jpeg';

export default function ServiciosPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 mb-24 text-center">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Nuestras Experiencias</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Un espacio pensado para cuidarte</h1>
 <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant mb-4">
 Beauté Divine Espace nace del deseo de ofrecer una atención cercana, personalizada y profesional, donde cada tratamiento se adapta a vos y a tus necesidades.
 </p>
 <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
 Un refugio de calma y cuidado, donde cada detalle está pensado para brindarte bienestar, acompañarte y hacer de cada visita, una experiencia creada especialmente para vos.
 </p>
 </section>
 {/* Services Bento Grid */}
 <section className="max-w-container-max mx-auto px-8 mb-section-padding">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {/* Card 1: Tratamientos Corporales */}
 <Link href="/tratamientos-corporales" className="group relative overflow-hidden bg-surface-container-low gold-border p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
 <div className="aspect-video mb-6 overflow-hidden">
 <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={imgCorp.src} alt="Tratamientos Corporales" />
 </div>
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Tratamientos Corporales</h3>
 <p className="font-body-md text-body-md text-on-surface-variant mb-8 grow">Masajes descontracturantes, drenaje linfático, Day Spa y más experiencias para aliviar, relajar y remodelar tu cuerpo.</p>
 <div className="flex items-center justify-between mt-auto">
 <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Ver Servicios</span>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
 </div>
 </Link>

 {/* Card 2: Tratamientos Faciales */}
 <Link href="/tratamientos-faciales" className="group relative overflow-hidden bg-surface-container-low gold-border p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
 <div className="aspect-video mb-6 overflow-hidden">
 <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={imgFacial.src} alt="Tratamientos Faciales" />
 </div>
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Tratamientos Faciales</h3>
 <p className="font-body-md text-body-md text-on-surface-variant mb-8 grow">Limpiezas profundas, Facial Sculpt, peelings y tratamientos específicos para purificar e iluminar tu rostro.</p>
 <div className="flex items-center justify-between mt-auto">
 <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Ver Servicios</span>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
 </div>
 </Link>

 {/* Card 3: Beauty Coaching */}
 <Link href="/beauty-coaching" className="group relative overflow-hidden bg-surface-container-low gold-border p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
 <div className="aspect-video mb-6 overflow-hidden">
 <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQKWZVloZOQO1n-RaSGbSWUkWPw730bY0dpQ4bMPBM72CyDl0J0CgL8YlpVkzi-OTmZT4QRq3vYu6TpXPzAsm861Qlv66X4PGcDPXpJLovFnwwFU8yvC8lMreTAMcd7IxFQk9eP_SGXZ4JNWJ8JDDC-_tAx2CMcLMlnJirgwo1ZatlWhV9FvGZPunSiF6bjb28gnFDUmECqgoOepYjsgqBUvCOUk0NLAph5GIn09nol9ndsxpjaREJw8hxwvXWIbzs_UZ_SCqW1sc" alt="Beauty Coaching" />
 </div>
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Beauty Coaching</h3>
 <p className="font-body-md text-body-md text-on-surface-variant mb-8 grow">Diagnóstico, rutina personalizada y guía profesional para tu piel.</p>
 <div className="flex items-center justify-between mt-auto">
 <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Ver Servicios</span>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
 </div>
 </Link>

 {/* Card 4: Terapias */}
 <Link href="/terapias" className="group relative overflow-hidden bg-surface-container-low gold-border p-8 flex flex-col h-full hover:-translate-y-2 transition-transform duration-500">
 <div className="aspect-video mb-6 overflow-hidden">
 <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={imgTerapias.src} alt="Terapias" />
 </div>
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Terapias</h3>
 <p className="font-body-md text-body-md text-on-surface-variant mb-8 grow">Sound Healing, Saint-Touche, Registros Akáshicos y Tameana para armonizar tu cuerpo, mente y emociones.</p>
 <div className="flex items-center justify-between mt-auto">
 <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Ver Servicios</span>
 <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
 </div>
 </Link>
 </div>
 </section>
 {/* CTA Section with animated background placeholder logic */}
 <section className="relative py-section-padding overflow-hidden">
 <div className="absolute inset-0 bg-primary-container/10"></div>
 {/* Subtly using the glassmorphism logic for a floating box */}
 <div className="relative max-w-4xl mx-auto px-8 text-center bg-surface/40 backdrop-blur-md p-16 gold-border">
 <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">Reservá tu experiencia</h2>
 <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
 Estoy lista para guiarte en tu transformación física, mental y almica!<br />
 Dejame tus datos y te contactaré para agendar una consulta personalizada.
 </p>
 <div className="flex flex-col md:flex-row gap-6 justify-center">
 <Link href="/contacto" className="bg-primary text-white px-10 py-4 font-label-sm text-label-sm uppercase hover:opacity-90 transition-all inline-block">Consultar Disponibilidad</Link>
 <Link href="/servicios" className="border border-primary text-primary px-10 py-4 font-label-sm text-label-sm uppercase hover:bg-primary-container transition-all inline-block">Ver Paquetes</Link>
 </div>
 </div>
 </section>
 </main>
 );
}
