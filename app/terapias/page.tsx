import Link from 'next/link';

export default function TerapiasPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Terapias</h1>
 <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-vUuP7IUbrEwCNZCLOTV6gF_iiOzHnia3r430O5gVIu10dgZrIi9L80EXJpGj5sfhFNhTDGvu8jENga1e7Y2gFHOTeuyCjIZZuohm_XHAcdBoZVFRRMFtSqmveONIhljgWav8AnKYYJyQa-yQSsKtxT5_LuhwQOdxUB7SDWaFy42naiFGTfaW9gKKYmF1HIHIvW_ForWRWFlbUz8ijpoI0nRqhPaq7zRV27HKaVQGS8WpyCieoGX-EBZ2CPeqdkft7PhKtsZB-ns" alt="Terapias" />
 </div>
 </section>

 {/* Services Grid */}
 <section className="max-w-container-max mx-auto px-8 mb-section-padding">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">SOUND HEALING MASSAGE</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Relajación profunda y armonía a través del masaje y la vibración sonora</p>
   <p>Sound Healing Massage es una experiencia de bienestar que combina un masaje orientado a favorecer la relajación profunda del cuerpo con la vibración armónica de cuencos de cuarzo, creando un espacio destinado al descanso, el bienestar emocional y la conexión interior.</p>
   <p>A través de maniobras suaves, lentas y envolventes, el contacto consciente de las manos ayuda a disminuir progresivamente los estados de tensión, favoreciendo la activación de la respuesta natural de relajación del sistema nervioso y promoviendo una profunda sensación de calma y bienestar.</p>
   <p>La experiencia se complementa con los sonidos y vibraciones de los cuencos de cuarzo, cuyas resonancias son percibidas por el cuerpo como una experiencia vibracional profunda. Desde la visión de la terapia sonora, estas frecuencias favorecen procesos de armonización que pueden sentirse tanto a nivel físico como emocional, invitando a estados de mayor calma, presencia y bienestar.</p>
   <p>Más que un tratamiento, es una invitación a hacer una pausa, desacelerar el ritmo cotidiano y regalarse un momento de profundo autocuidado y bienestar integral.</p>
   <p>Ideal para quienes desean alejarse del estrés cotidiano, encontrar un espacio de descanso y reconexión interior, y vivenciar una experiencia que integra masaje y vibración sonora.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">SAINT-TOUCHÉ®</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Toque sagrado para armonizar cuerpo, energía y emociones</p>
   <p>Saint-Touché®, que en francés significa "Toque Sagrado", es una técnica que integra la canalización energética a través de las manos con el trabajo sobre el cuerpo físico y los cuerpos sutiles.</p>
   <p>La sesión parte de la comprensión de que nuestras experiencias pueden dejar huellas en el plano emocional, físico y energético. A través de la canalización energética, favorece procesos de liberación emocional, armonización integral y elevación vibracional, promoviendo una mayor fluidez energética y bienestar.</p>
   <p>Esta experiencia acompaña procesos de transformación personal que pueden reflejarse tanto en el cuerpo como en las emociones, favoreciendo una mayor sensación de equilibrio interior, la liberación de cargas emocionales y una conexión más profunda con uno mismo.</p>
   <p>Ideal para quienes buscan un espacio de reconexión y armonización energética que acompañe su bienestar físico, emocional y espiritual.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">LECTURA DE REGISTROS AKÁSHICOS</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Un espacio de comprensión, orientación y conexión con el alma</p>
   <p>Los Registros Akáshicos son considerados, dentro de distintas tradiciones espirituales, una memoria universal donde se encuentra la información relacionada con la experiencia y evolución de cada alma. A través de su lectura es posible acceder a mensajes, comprensiones y orientaciones que aportan una nueva mirada sobre situaciones, desafíos o procesos que la persona está atravesando.</p>
   <p>La sesión se desarrolla en un espacio de escucha y conexión profunda, donde pueden abordarse temas relacionados con vínculos, decisiones, propósito de vida, talentos, bloqueos, miedos o patrones repetitivos, favoreciendo una comprensión más amplia de la propia experiencia.</p>
   <p>Más que buscar respuestas externas, la lectura invita a conectar con una mayor conciencia de uno mismo y a recibir orientación desde una perspectiva espiritual que ayude a comprender aquello que hoy necesita ser observado, integrado o transformado.</p>
   <p>Ideal para quienes desean obtener mayor claridad sobre situaciones de su vida, comprender patrones que se repiten y conectar con una perspectiva más profunda de su camino personal y espiritual.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">TAMEANA</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Armonización vibracional para expandir la conciencia y transformar la experiencia de vida</p>
   <p>Tameana es una técnica vibracional canalizada por Juan Manuel Giordano que utiliza cristales de cuarzo y geometrías específicas como herramientas de resonancia y armonización.</p>
   <p>Desde la visión de Tameana, todo en el universo es vibración e información. Nuestra forma de percibir, sentir y experimentar la vida está íntimamente relacionada con la frecuencia desde la cual vivimos. Por ello, cuando nuestra vibración cambia, también puede transformarse nuestra manera de relacionarnos con nosotros mismos, con los demás y con las experiencias que atravesamos.</p>
   <p>La técnica propone un espacio de resonancia que favorece estados de mayor coherencia, paz y conciencia, permitiendo una conexión más profunda con la propia esencia y una mirada más amplia sobre la experiencia de vida.</p>
   <p>Tameana acompaña procesos de transformación interior a través de la expansión de la conciencia, favoreciendo que emerjan nuevas comprensiones, posibilidades y formas de experimentar la realidad.</p>
   <p>Ideal para quienes desean profundizar su camino espiritual, conectar con una mayor sensación de paz interior y explorar herramientas de expansión de conciencia y armonización vibracional.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">THETAHEALING®</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Transformación interior para crear nuevas posibilidades de vida</p>
   <p>ThetaHealing® es una técnica de desarrollo personal y espiritual creada por Vianna Stibal que utiliza el estado Theta cerebral como herramienta para favorecer procesos de transformación interior. A través de una meditación guiada específica, permite acceder a niveles más profundos del subconsciente y explorar información que habitualmente permanece fuera de la conciencia cotidiana.</p>
   <p>Desde esta mirada, es posible identificar y transformar creencias, programas, emociones, patrones heredados y experiencias que pueden estar influyendo en la forma en que vivimos nuestra realidad. Al trabajar sobre la información almacenada en el subconsciente, la persona puede generar cambios internos que favorezcan nuevas formas de percibir, sentir, elegir y crear su experiencia de vida.</p>
   <p>ThetaHealing® permite explorar aspectos relacionados con vínculos, autoestima, abundancia, salud, emociones y patrones del sistema familiar que pueden estar influyendo en el presente. Según la enseñanza de Vianna Stibal, cuando transformamos aquello que se encuentra en el origen de determinadas experiencias, también pueden transformarse los resultados que manifestamos en nuestra realidad cotidiana.</p>
   <p>Ideal para quienes desean comprender y transformar patrones limitantes, generar cambios profundos desde el interior y abrirse a nuevas posibilidades en distintas áreas de su vida.</p>
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
