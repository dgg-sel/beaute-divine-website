import Link from 'next/link';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    title: "BEAUTY COACHING",
    shortDescription: "Diagnóstico, rutina personalizada y guía profesional para tu piel.",
    longDescription: (
      <>
        <p>Beauty Coaching es una experiencia de asesoramiento personalizado diseñada para ayudarte a comprender las necesidades reales de tu piel y aprender a cuidarla de manera consciente, efectiva y sostenible.</p>
        <p>A través de una evaluación integral, analizaremos el estado de tu piel, tus hábitos, estilo de vida y objetivos para diseñar una rutina completamente adaptada a vos.</p>
        <p>Durante la sesión recibirás orientación profesional sobre el tipo y estado de tu piel, la rutina ideal de cuidado, los activos cosméticos más adecuados para tus necesidades, la correcta selección y aplicación de productos, y los hábitos que favorecen su salud y belleza. Además, revisaremos los productos que ya utilizás para optimizar tu rutina y potenciar sus resultados.</p>
        <p>El objetivo no es que compres más productos, sino que aprendas a elegir mejor, cuidar tu piel con mayor criterio y construir una rutina que realmente funcione para vos.</p>
        <p className="font-bold">Duración: 60 a 90 minutos<br/>Modalidad: Presencial u online</p>
      </>
    )
  }
];

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
          {services.map((service, idx) => (
            <ServiceCard 
              key={idx}
              title={service.title}
              shortDescription={service.shortDescription}
              longDescription={service.longDescription}
            />
          ))}
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
