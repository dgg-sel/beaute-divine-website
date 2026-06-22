import Link from 'next/link';
import facialSculptImg from '@/img/Facial Sculpt.jpeg';

export default function FacialSculptPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 py-16 text-center">
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-12 italic">Facial Sculpt</h1>
 
 <div className="max-w-4xl mx-auto flex justify-center mt-8">
 <div className="md:w-1/2">
 <img 
 src={facialSculptImg.src} 
 alt="Facial Sculpt" 
 className="w-full rounded-sm object-cover aspect-[4/5] soft-glow shadow-lg"
 />
 </div>
 </div>

 <div className="mt-16">
 <Link href="/fascias" className="bg-primary text-white px-10 py-4 font-label-sm text-label-sm uppercase hover:opacity-90 transition-all">Volver a Fascias</Link>
 </div>
 </section>
 </main>
 );
}
