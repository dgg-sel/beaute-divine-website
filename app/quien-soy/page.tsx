import Link from 'next/link';
import marcelaImg from '@/img/Marcela en el bosque.jpeg';

export default function QuienSoyPage() {
 return (
 <main>
 {/* Hero Section / Personal Intro */}
 <section className="max-w-container-max mx-auto px-8 pt-20 pb-section-padding transition-all duration-1000 opacity-100 translate-y-0">
 <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
 <div className="md:col-span-5 flex flex-col gap-8">
 <div className="relative group">
 <div className="absolute -inset-4 border border-primary/20 transition-all duration-500 group-hover:inset-0"></div>
 <img alt="Portrait de la fondatrice" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 soft-gold-glow relative z-10" src={marcelaImg.src} />
 <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-container/10 -z-0"></div>
 </div>
 <div className="grid grid-cols-1 gap-8 mt-4">
 <div className="p-6 bg-surface-container-low border border-primary/10">
 <h3 className="font-headline-md text-headline-md text-primary mb-2 italic">Misión</h3>
 <p className="font-body-md text-body-md text-on-surface-variant">Acompañar procesos de transformación y bienestar, a través de tratamientos faciales, corporales y energéticos personalizados, promoviendo la armonía entre cuerpo, mente y alma, para que cada persona pueda sentirse y verse en su mejor versión.</p>
 </div>
 <div className="p-6 bg-surface-container-low border border-primary/10">
 <h3 className="font-headline-md text-headline-md text-primary mb-2 italic">Visión</h3>
 <p className="font-body-md text-body-md text-on-surface-variant">Inspirar una forma más consciente de vivir la belleza y el bienestar, comprendiendo al ser humano como un todo. Mi visión es promover un abordaje integrativo que armonice cuerpo, mente y alma, respetando y acompañando los procesos naturales del cuerpo para favorecer el equilibrio, el bienestar y una conexión más profunda con uno mismo.</p>
 </div>
 </div>
 </div>
 <div className="md:col-span-7 flex flex-col gap-8">
 <div>
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Fundadora &amp; Especialista</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface">Marcela Hilú</h1>
 </div>
 <div className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl flex flex-col gap-4">
 <p>Desde siempre sentí una profunda fascinación por el mundo de la belleza: la cosmética, las fragancias, el maquillaje y la alquimia que los une.</p>
 <p>Mi camino comenzó con mi formación como maquilladora profesional y continuó con estudios en cosmetología, cosmiatría, estética y masoterapia.</p>
 <p>A partir de allí, me desarrollé asesorando y comercializando marcas de dermocosmética y cosmética de lujo —como La Roche-Posay, Avène, Eucerin, Lancôme, Clarins y Orlane, entre otras— para empresas nacionales e internacionales.</p>
 <p>Esta experiencia me permitió conocer profundamente la piel, sus necesidades y sus cuidados.</p>
 <p>También me desempeñé como responsable del área de estética en distintos centros, diseñando e implementando protocolos estéticos y experiencias de spa.</p>
 <p>Paralelamente, mi alma me guiaba por otro camino: el de la espiritualidad, las terapias energéticas y la evolución del ser.<br />
 Me formé como Maestra en Reiki Usui y estudié Tarot Egipcio, Rider Waite, ThetaHealing®️, Lectura de Registros Akáshicos, Tameana y otras técnicas energéticas, hasta encontrar mi propio camino: Sanación en Luz, un profundo proceso de transformación personal que me permitió desarrollar una nueva mirada sobre la belleza.</p>
 <p>Hoy, todo ese recorrido converge en una visión integrativa que deseo compartir con el mundo.</p>
 <p>Para mí, la belleza es una frecuencia.</p>
 <p>Un estado de consciencia que trasciende lo meramente físico. Es la luz que emerge cuando vivimos en coherencia con quienes somos. Y aunque puede reflejarse en el exterior, su origen se encuentra en lo más profundo de nuestro ser.<br />
 Por eso, mi propuesta va más allá de los tratamientos estéticos. Integra el trabajo con el cuerpo, la mente, las emociones y el alma, porque creo que la verdadera transformación ocurre de adentro hacia afuera.</p>
 <p>Te invito a reconectar con tu belleza auténtica, única e irrepetible. Esa que no se encuentra solamente en lo externo, sino que florece desde tu esencia y se expresa en cada etapa de tu evolución.</p>
 <p>Cada encuentro es una oportunidad para honrar tu luz, armonizar tu energía y acompañarte en el camino de manifestar tu belleza más genuina: la que nace cuando te reconocés, te cuidás y te amás en totalidad.</p>
 <p>Te extiendo mi mano para recorrer este hermoso camino juntos/as!</p>
 </div>
 </div>
 </div>
 </section>

 </main>
 );
}
