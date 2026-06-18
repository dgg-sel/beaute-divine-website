import Link from 'next/link';

export default function NeuroFascialBalancePage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 py-16 text-center">
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-12 italic">Neuro Fascial Balance</h1>
 
 <div className="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-lg border border-primary/10">
   <img src="/img/neuro-fascial.jpg" alt="Neuro Fascial Balance Massage" className="w-full h-auto object-cover md:max-h-[600px]" />
 </div>

 <div className="py-8 max-w-4xl mx-auto flex items-center justify-center">
 <h2 className="font-headline-lg text-3xl md:text-5xl text-primary text-center uppercase tracking-[0.2em] px-4">Próximamente</h2>
 </div>
 <div className="mt-12">
 <Link href="/fascias" className="bg-primary text-white px-10 py-4 font-label-sm text-label-sm uppercase hover:opacity-90 transition-all">Volver a Fascias</Link>
 </div>
 </section>
 </main>
 );
}
