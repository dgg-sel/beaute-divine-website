import Link from 'next/link';
import { getReviews } from '@/app/actions/review-actions';
import { ReviewCarousel } from '@/components/ui/ReviewCarousel';

export default async function Home() {
  let reviews: any[] = [];
  let errorMsg = null;
  try {
    reviews = await getReviews(true);
  } catch (e: any) {
    errorMsg = e.message || String(e);
  }

  return (
 <main>
 {/* Hero Section */}
 <section className="relative min-h-[90vh] flex items-center overflow-hidden">
 <div className="absolute inset-0">
 <img alt="Serene wellness professional background" className="w-full h-full object-cover object-[center_10%] opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAYCadEW7HV-Pvcyr5RybZZBiovyslRZ46cNrwjckErRc_yLnkorxRN3Kxs5g1rxfMatGS5fYXcaiwW4geJouFReteyQYVIuOqP_no9dvIpZVL6XO5JbAfpVrPyY9hOyawgTn6E7p9azQ-SqmJ97ef2seKfmsaEp2vGi-_GVIOHui7RhYTb-ewwert-sqjpuGcLTN8mD0sPaRW01ClVjmA7ioT-Ppl9s6FXHaTA2br7Wn5O3chU2qOMz0nPAYJzepMeFBgzJBn-Gs"/>
 {errorMsg && (
   <div className="bg-red-500 text-white p-4 text-center z-50 relative">
     ERROR: {errorMsg}
   </div>
 )}
 <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
 </div>
 <div className="container-max mx-auto px-8 relative grid md:grid-cols-2 gap-12 items-center">
 <div className="flex flex-col gap-8">
 <div className="relative w-fit">
 <div className="absolute inset-0 bg-surface/60 blur-2xl rounded-full scale-[1.5]"></div>
 <img alt="Beauté Divine Logo" className="relative w-48 md:w-64 transform scale-90 origin-left -mt-2 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTwgnCOeLqMuakWE6d8_7IBwsBrJtih7FA1rZsW1MnGawgAfl57jbJuXYREmzZPLCuk7tFCOrDcPMD0o3ohkFV-dAbpuiGvxInxD6NxQ58z9mjRZoGli168hMxpCGvRAI9REANT1VdmFhKllWcJwIy21c66I4dUkBV-XpLPs47L4m2fWES4egEs70eD7Ih24is1W5Zy1xlNcm7cYox0M8O6z-gr83uavRdsCEvKOFrtkkY250gHfanPqxHljhAphbGXbqYGkE1Gew"/>
 </div>
 <h1 className="font-display-lg text-display-lg text-primary max-w-xl">
 Redescubrí tu <br/>
 <span className="italic">Belleza Única e Irrepetible</span>
 </h1>
 <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
 La belleza no está en la forma de las cosas, sino en la manera en que las contemplamos. Todo aquello que amamos se vuelve bello ante nuestros ojos. También nuestro cuerpo: cuando lo miramos con amor y gratitud, dejamos de buscar la belleza y comenzamos a reconocerla.
 </p>
 <div className="flex gap-4">
 <Link href="/servicios" className="bg-primary-container text-on-primary-container px-10 py-4 font-label-sm text-label-sm uppercase tracking-widest metallic-edge hover:brightness-110 transition-all flex items-center justify-center">Explorar Tratamientos</Link>
 </div>
 </div>
 </div>
 </section>

 {/* Holistic Intro Section */}
 <section className="py-section-padding bg-surface" id="who">
 <div className="max-w-container-max mx-auto px-8">
 <div className="grid md:grid-cols-2 gap-24 items-center">
 <div className="relative">
 <div className="aspect-[4/5] bg-secondary-container rounded-sm overflow-hidden soft-glow">
 <img className="w-full h-full object-cover" alt="Wellness studio" src="/img/landing-espacio.png"/>
 </div>
 </div>
 <div className="flex flex-col gap-6">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em]">Estética Holística</span>
 <h2 className="font-headline-lg text-headline-lg text-on-background">Tu espacio de belleza y bienestar</h2>
 <p className="font-body-md text-body-md text-on-surface-variant">
 Creo que la belleza auténtica nace de la conexión con nosotros mismos, de habitar nuestra esencia con coherencia y de cultivar una relación amorosa con nuestro cuerpo.
 <br /><br />
 En Beauté Divine Espace te acompaño a través de tratamientos faciales, corporales y experiencias de bienestar diseñadas para realzar tu belleza natural y armonizar cuerpo y mente.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Services Bento Grid */}
 <section className="py-section-padding bg-surface-container-low" id="services">
 <div className="max-w-container-max mx-auto px-8">
 <div className="text-center mb-20">
 <h2 className="font-headline-lg text-headline-lg mb-4">Servicios Destacados</h2>
 <div className="w-24 h-px bg-primary mx-auto opacity-40"></div>
 </div>
 <div className="grid md:grid-cols-12 gap-8">
 {/* Fit Massage Main */}
 <div className="md:col-span-8 group relative overflow-hidden bg-surface rounded-sm soft-glow border border-primary/10 transition-transform duration-500 hover:-translate-y-2" id="fit">
 <div className="aspect-[16/9] md:aspect-auto md:h-full grid md:grid-cols-2">
 <div className="h-full">
 <img className="w-full h-full object-cover" alt="Fit massage" src="/img/landing-fascial-fit.png"/>
 </div>
 <div className="p-12 flex flex-col justify-center gap-4">
 <div className="bg-secondary-container w-fit px-3 py-1 rounded-full text-secondary font-label-sm text-xs">Exclusivo</div>
 <h3 className="font-headline-md text-headline-md">Fascial Fit Remodeling</h3>
 <p className="font-body-md text-on-surface-variant">Combina drenaje neurolinfático, trabajo miofascial, activación muscular y remodelación corporal logrando una silueta más armónica y funcional.</p>
 <Link href="/fascial-fit-remodeling" className="mt-4 text-primary font-label-sm text-sm uppercase tracking-widest flex items-center gap-2 group">
 Saber más <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
 </Link>
 </div>
 </div>
 </div>
 {/* Facial Rituals */}
 <div className="md:col-span-4 group bg-surface rounded-sm soft-glow border border-primary/10 p-8 flex flex-col gap-6 hover:bg-secondary-container/30 transition-colors">
 <div className="aspect-square bg-surface-container-high rounded-sm overflow-hidden">
 <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Neuro Fascial Balance" src="/img/landing-neuro-fascial.png"/>
 </div>
 <div>
 <h3 className="font-headline-md text-xl mb-2">Neuro Fascial Balance</h3>
 <p className="font-body-md text-on-surface-variant text-sm">Una experiencia corporal integrativa que combina masaje muscular, liberación miofascial y movilizaciones funcionales, logrando movilidad, equilibrio y bienestar general.</p>
 </div>
 </div>
 {/* Energy Balance */}
 <div className="md:col-span-4 group bg-surface rounded-sm soft-glow border border-primary/10 p-8 flex flex-col gap-6 hover:bg-secondary-container/30 transition-colors">
 <div className="aspect-square bg-surface-container-high rounded-sm overflow-hidden">
 <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Facial Sculpt" src="/img/landing-facial-sculpt.png"/>
 </div>
 <div>
 <h3 className="font-headline-md text-xl mb-2">Facial Sculpt</h3>
 <p className="font-body-md text-on-surface-variant text-sm">Un abordaje manual que integra técnicas miofasciales y drenaje neurolinfático, logrando un lifting natural.</p>
 </div>
 </div>
 {/* Wellness Gift */}
 <div className="md:col-span-8 bg-primary text-on-primary p-12 rounded-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
 <div className="absolute inset-0 opacity-10 pointer-events-none">
 <div className="grid grid-cols-6 h-full w-full">
 <div className="border-r border-on-primary"></div>
 <div className="border-r border-on-primary"></div>
 <div className="border-r border-on-primary"></div>
 <div className="border-r border-on-primary"></div>
 <div className="border-r border-on-primary"></div>
 </div>
 </div>
 <div className="relative z-10">
 <h3 className="font-headline-md text-3xl mb-2 italic">Regala una Experiencia</h3>
 <p className="font-body-md opacity-90">Sorprende a alguien especial con nuestras tarjetas de regalo personalizadas.</p>
 </div>
 <button className="relative z-10 bg-on-primary text-primary px-8 py-4 font-label-sm text-sm uppercase tracking-widest hover:bg-surface transition-colors">
 Comprar Gift Card
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* YouTube Featured Video Section */}
 <section className="py-section-padding bg-surface" id="youtube-highlights">
 <div className="max-w-container-max mx-auto px-8">
 <div className="grid md:grid-cols-2 gap-16 items-center">
 <div className="flex flex-col gap-6">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em]">Nuestro Canal</span>
 <h2 className="font-headline-lg text-headline-lg text-on-background">Inspiración para tu bienestar</h2>
 <p className="font-body-md text-body-md text-on-surface-variant">
 Descubrí contenidos sobre cuidado de la piel, bienestar integral, rituales de autocuidado y herramientas para cultivar el equilibrio entre cuerpo, mente y alma.
 </p>
 <a className="bg-primary text-on-primary px-8 py-4 font-label-sm text-label-sm uppercase tracking-widest metallic-edge hover:opacity-90 active:scale-95 transition-all text-center inline-block w-fit" href="https://youtube.com/@beautedivineespace" target="_blank" rel="noreferrer">
 Ir al Canal de YouTube
 </a>
 </div>
 <div className="relative aspect-video rounded-sm overflow-hidden soft-glow border border-primary/10">
 <iframe className="w-full h-full" src="https://www.youtube.com/embed/UjtVTiDCb4A" title="Beauté Divine Espace YouTube" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
 </div>
 </div>
 </div>
 </section>

 {/* Testimonials Section */}
 {reviews.length > 0 && (
   <section className="py-section-padding bg-surface-container-low" id="testimonials">
     <div className="max-w-container-max mx-auto px-8">
       <div className="text-center mb-12">
         <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em]">Testimonios</span>
         <h2 className="font-headline-lg text-headline-lg mt-4 mb-4 text-on-background">Lo que dicen nuestras clientas</h2>
         <div className="w-24 h-px bg-primary mx-auto opacity-40"></div>
       </div>
       <ReviewCarousel reviews={reviews} />
     </div>
   </section>
 )}

 <section className="relative py-section-padding overflow-hidden" id="contact">
 <div className="absolute inset-0 bg-secondary-container/20 z-0">
 </div>
 <div className="max-w-container-max mx-auto px-8 relative z-10">
 <div className="max-w-2xl mx-auto text-center flex flex-col gap-8">
 <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary">Reservá tu experiencia</h2>
 <p className="font-body-lg text-body-lg text-on-surface-variant">
 Estoy lista para guiarte en tu transformación física, mental y almica!<br/>
 Dejame tus datos y te contactaré para agendar una consulta personalizada.</p>
 <form action="https://formsubmit.co/marcelahilu@hotmail.com" method="POST" className="flex flex-col gap-6 mt-8">
 <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Beauté Divine"/>
 <input type="hidden" name="_template" value="table"/>
 <div className="grid md:grid-cols-2 gap-8">
 <input className="bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:border-primary focus:ring-0 font-label-sm text-sm py-4 outline-none placeholder:text-outline/60" placeholder="NOMBRE COMPLETO" type="text" name="name" required/>
 <input className="bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:border-primary focus:ring-0 font-label-sm text-sm py-4 outline-none placeholder:text-outline/60" placeholder="EMAIL" type="email" name="email" required/>
 </div>
 <textarea className="bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:border-primary focus:ring-0 font-label-sm text-sm py-4 outline-none placeholder:text-outline/60" placeholder="¿EN QUÉ PODEMOS AYUDARTE?" rows={3} name="mensaje" required></textarea>
 <button className="bg-primary text-on-primary px-12 py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] self-center mt-4 metallic-edge hover:scale-105 transition-transform duration-300" type="submit">
 Enviar Solicitud
 </button>
 </form>
 </div>
 </div>
 </section>
 </main>
 );
}
