import Link from 'next/link';
import facialSculptImg from '@/img/Facial Sculpt.jpeg';

export default function FacialSculptPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-8 py-16 text-center">
        <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-12 italic">Facial Sculpt</h1>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left mt-8">
          <div className="md:w-1/2">
            <img 
              src={facialSculptImg.src} 
              alt="Facial Sculpt" 
              className="w-full rounded-sm object-cover aspect-[4/5] soft-glow shadow-lg"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-6">
            <h2 className="font-headline-md text-3xl text-primary">Un espacio pensado para cuidarte</h2>
            <p className="font-body-md text-on-surface-variant">
              Beauté Divine Espace nace del deseo de ofrecer una atención cercana, personalizada y profesional, donde cada tratamiento se adapta a vos y a tus necesidades.
            </p>
            <p className="font-body-md text-on-surface-variant">
              Un refugio de calma y cuidado, donde cada detalle está pensado para brindarte bienestar, acompañarte y hacer de cada visita, una experiencia creada especialmente para vos.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/fascias" className="bg-primary text-white px-10 py-4 font-label-sm text-label-sm uppercase hover:opacity-90 transition-all">Volver a Fascias</Link>
        </div>
      </section>
    </main>
  );
}
