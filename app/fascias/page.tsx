import Link from 'next/link';
import neurofascialImg from '@/img/Neurofascial.jpeg';
import facialSculptImg from '@/img/Facial Sculpt.jpeg';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    id: "facial-sculpt",
    title: "FACIAL SCULPT™️",
    shortDescription: "Reafirma, redefine y rejuvenece el rostro.",
    imageSrc: facialSculptImg.src,
    longDescription: (
      <>
        <p className="font-bold text-primary">Lifting facial manual para redefinir contornos, rejuvenecer y armonizar el rostro</p>
        <p>El estrés, las tensiones musculares, los hábitos posturales y la pérdida de tonicidad pueden influir en la expresión, el equilibrio y la definición natural del rostro.</p>
        <p>Facial Sculpt es un tratamiento de lifting facial manual basado en principios de la kinesiología, la osteopatía y la biomecánica facial. A diferencia de los tratamientos centrados exclusivamente en la piel, trabaja sobre músculos, fascias y estructuras de sostén que influyen directamente en la forma y armonía facial.</p>
        <p>A través de maniobras específicas favorece la liberación de tensiones, el drenaje linfático y el equilibrio funcional del rostro, contribuyendo a mejorar la firmeza, elasticidad e hidratación de la piel. También ayuda a suavizar líneas de expresión, reducir bolsas debajo de los ojos, mejorar la definición del contorno mandibular y favorecer el aspecto de la zona submentoniana.</p>
        <p>El resultado es un rostro más definido, armonioso y luminoso, con una apariencia más descansada y un visible efecto lifting natural.</p>
        <p>Ideal para quienes desean redefinir los contornos faciales, mejorar la firmeza de la piel y disfrutar de un rejuvenecimiento natural sin procedimientos invasivos.</p>
      </>
    )
  },
  {
    id: "fascial-fit-remodeling",
    title: "Fascial Fit Remodeling®",
    shortDescription: "Remodela la silueta desde un abordaje fascial y funcional.",
    imageSrc: "/img/fascial-fit.jpg",
    longDescription: (
      <>
        <p className="font-bold text-primary">Remodelación corporal integral mediante trabajo fascial, drenaje neuro-linfático y abordaje estructural</p>
        <p>El cuerpo funciona como una red interconectada donde las fascias, los músculos, los líquidos corporales y el sistema nervioso trabajan en constante relación. Cuando esta red pierde movilidad, pueden aparecer restricciones tisulares, alteraciones en el drenaje y tensiones que influyen tanto en la forma corporal como en el bienestar general.</p>
        <p>Fascial Fit Remodeling® es un método de remodelación corporal basado en principios de la osteopatía, la kinesiología y la biomecánica. Combina técnicas específicas de liberación fascial, drenaje neuro-linfático y trabajo estructural orientadas a mejorar la movilidad de los tejidos, favorecer la circulación de líquidos y optimizar la organización corporal.</p>
        <p>A diferencia de los tratamientos reductores tradicionales que se enfocan únicamente en una zona específica, este abordaje considera al cuerpo como una unidad funcional, trabajando sobre estructuras clave como el diafragma, las cadenas fasciales y las zonas donde suelen acumularse restricciones que afectan el drenaje, la postura y el movimiento.</p>
        <p>Al mejorar la movilidad de los tejidos y favorecer el drenaje neuro-linfático, el tratamiento contribuye a disminuir la sensación de inflamación y pesadez, mejorar la circulación de líquidos, favorecer la reducción de adiposidad localizada y optimizar la definición de la silueta.</p>
        <p>Ideal para personas que desean favorecer la remodelación corporal, mejorar el drenaje de líquidos, reducir la sensación de inflamación y pesadez, y lograr una silueta más armónica y definida desde una mirada integral.</p>
      </>
    )
  },
  {
    id: "neuro-fascial-balance",
    title: "Neurofascial Balance™️",
    shortDescription: "Recupera movilidad, bienestar y equilibrio corporal.",
    imageSrc: "/img/neuro-fascial.jpg",
    longDescription: (
      <>
        <p className="font-bold text-primary">Liberación fascial y regulación del sistema nervioso para recuperar equilibrio y bienestar</p>
        <p>La fascia es una red de tejido conectivo que conecta y envuelve músculos, órganos, nervios y estructuras corporales, desempeñando un papel fundamental en el movimiento, la postura y la respuesta del organismo frente al estrés.</p>
        <p>Las tensiones físicas, emocionales y posturales pueden generar restricciones fasciales que afectan la movilidad de los tejidos y favorecen estados prolongados de tensión, sobrecarga y malestar.</p>
        <p>Neurofascial Balance es un abordaje manual orientado a liberar estas restricciones mediante técnicas específicas de trabajo fascial que favorecen una mejor movilidad de los tejidos y una respuesta más equilibrada del sistema nervioso.</p>
        <p>A diferencia de un masaje descontracturante, no trabaja únicamente sobre la musculatura, sino también sobre las conexiones fasciales que influyen en la postura, la respiración y el bienestar general del organismo.</p>
        <p>Muchas personas experimentan después de la sesión una sensación de mayor amplitud corporal, respiración más libre, relajación profunda y una renovada percepción de equilibrio físico y emocional.</p>
        <p>Ideal para quienes presentan estrés físico o emocional, tensión acumulada, rigidez corporal o sensación de sobrecarga, y buscan recuperar bienestar desde una mirada integral del cuerpo.</p>
      </>
    )
  }
];

export default function FasciasPage() {
 return (
 <main>
 <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
 <div className="absolute inset-0 z-0">
 <img className="w-full h-full object-cover" data-alt="A serene high-end spa treatment room with soft sunlight streaming through linen curtains. The atmosphere is ethereal and calming, featuring a minimalist massage table, soft gold accents on the walls, and a palette of warm off-whites and light wood tones. The focus is on luxury and professional holistic wellness in a modern Argentine setting." src={neurofascialImg.src} />
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

 {/* Services Grid */}
 <section className="max-w-container-max mx-auto px-8 py-section-padding">
   <div className="text-center mb-16">
     <h2 className="font-headline-lg text-headline-lg text-on-surface">Nuestros Tratamientos</h2>
     <div className="w-24 h-px bg-primary mx-auto mt-6"></div>
   </div>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {services.map((service, idx) => (
       <ServiceCard 
         key={idx}
         id={service.id}
         title={service.title}
         shortDescription={service.shortDescription}
         longDescription={service.longDescription}
         imageSrc={service.imageSrc}
       />
     ))}
   </div>
 </section>

 {/* CTA Section */}
 <section className="py-[120px] px-8 text-center bg-surface" id="booking">
 <div className="max-w-2xl mx-auto">
 <h2 className="font-headline-lg text-headline-lg mb-6">Comienza tu transformación hoy.</h2>
 <p className="font-body-md text-body-md text-on-surface-variant mb-12">
 Reservá tu turno para una evaluación personalizada y descubrí los beneficios de nuestros tratamientos.
 </p>
 <a href="https://wa.me/5491144133627?text=Hola!%20Quiero%20reservar%20un%20turno%20para%20Neurofascial." target="_blank" rel="noopener noreferrer" className="block w-full max-w-sm mx-auto bg-primary text-on-primary py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all mb-12">
 Solicitar Turno
 </a>
 <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">Ubicado en Acassuso, San Isidro.</p>
 </div>
 </section>
 </main>
 );
}
