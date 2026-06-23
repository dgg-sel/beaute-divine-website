import Link from 'next/link';

export default function TratamientosFacialesPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Tratamientos Faciales</h1>
 <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiXFITE8vL3AVu4-sthOehTURWgkZnU14PZKzS31pH4wkzXtUz6F94Erlu0r8cHvby2Ei0HkHiiZdDwV4Djlj-veWR0NtOmSf7KuIGcxJyZXL8nHZhXwZzuXzsSCl35He85rs8_t2NQWvm7mLCQbPc3PJTN7TcW3JahPwBX2HZcE5OFkdkvJU1CHQLgsPSuu1vVxxq5E-1KWqSXrT2UBUvO5ZEtJcNPoIAfj4xITUm4dkWKrXjRN6Jm7e2_FD7GKd9quzAOcyuVwo" alt="Tratamientos Faciales" />
 </div>
 </section>

 {/* Services Grid */}
 <section className="max-w-container-max mx-auto px-8 mb-section-padding">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">LIMPIEZA FACIAL PROFUNDA</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Extracción de impurezas, renovación e hidratación para una piel más saludable</p>
   <p>La limpieza facial profunda es uno de los tratamientos fundamentales para mantener la piel sana, equilibrada y libre de impurezas acumuladas.</p>
   <p>Con el tiempo, el exceso de oleosidad, las células muertas, el maquillaje y la contaminación pueden favorecer la aparición de comedones, puntos negros e imperfecciones, haciendo que la piel luzca más opaca y congestionada.</p>
   <p>Este tratamiento combina una higiene profunda con la extracción manual de impurezas acumuladas, ayudando a mejorar el aspecto general de la piel y favoreciendo una apariencia más limpia, uniforme y luminosa.</p>
   <p>A diferencia de una limpieza facial express, incorpora una etapa de extracción específica y finaliza con una hidratación intensiva adaptada a las necesidades de cada piel, aportando confort, frescura y bienestar cutáneo.</p>
   <p>El resultado es una piel más limpia, suave, luminosa y equilibrada, mejor preparada para aprovechar los beneficios de los productos utilizados en el cuidado diario.</p>
   <p>Ideal para quienes desean una piel más limpia, luminosa y saludable, eliminar impurezas acumuladas y mantener el equilibrio natural de la piel.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">LIMPIEZA FACIAL EXPRESS</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Frescura, luminosidad y renovación para mantener la piel en equilibrio</p>
   <p>La piel está expuesta diariamente a factores como la contaminación, el maquillaje, el estrés y la acumulación de células muertas, que pueden afectar su luminosidad y hacer que se vea opaca o apagada.</p>
   <p>La Limpieza Facial Express es un tratamiento orientado a mantener la piel limpia, fresca y luminosa mediante una higiene profesional que ayuda a eliminar impurezas superficiales y favorecer la renovación de la superficie cutánea.</p>
   <p>A través de un protocolo adaptado a las necesidades de cada piel, contribuye a mejorar la textura, la suavidad y el aspecto general del rostro, aportando una sensación inmediata de frescura y bienestar.</p>
   <p>Es una excelente opción para quienes desean mantener la piel saludable entre limpiezas faciales profundas o incorporar un cuidado profesional periódico dentro de su rutina de autocuidado.</p>
   <p>El resultado es una piel más luminosa, uniforme y revitalizada, con una apariencia fresca, cuidada y saludable.</p>
   <p>Ideal para quienes desean mantener una piel limpia, fresca y luminosa, recuperar vitalidad en el rostro y complementar su rutina habitual de cuidado facial.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">FACIAL SCULPT™️</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Lifting facial manual para redefinir contornos, rejuvenecer y armonizar el rostro</p>
   <p>El estrés, las tensiones musculares, los hábitos posturales y la pérdida de tonicidad pueden influir en la expresión, el equilibrio y la definición natural del rostro.</p>
   <p>Facial Sculpt es un tratamiento de lifting facial manual basado en principios de la kinesiología, la osteopatía y la biomecánica facial. A diferencia de los tratamientos centrados exclusivamente en la piel, trabaja sobre músculos, fascias y estructuras de sostén que influyen directamente en la forma y armonía facial.</p>
   <p>A través de maniobras específicas favorece la liberación de tensiones, el drenaje linfático y el equilibrio funcional del rostro, contribuyendo a mejorar la firmeza, elasticidad e hidratación de la piel. También ayuda a suavizar líneas de expresión, reducir bolsas debajo de los ojos, mejorar la definición del contorno mandibular y favorecer el aspecto de la zona submentoniana.</p>
   <p>El resultado es un rostro más definido, armonioso y luminoso, con una apariencia más descansada y un visible efecto lifting natural.</p>
   <p>Ideal para quienes desean redefinir los contornos faciales, mejorar la firmeza de la piel y disfrutar de un rejuvenecimiento natural sin procedimientos invasivos.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">DETOX & LIFTING SHOCK</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Revitalización profunda y efecto lifting natural</p>
   <p>Detox & Lifting Shock es un tratamiento de revitalización facial diseñado para mejorar la calidad de la piel, favorecer la firmeza de los tejidos y devolver frescura, luminosidad y vitalidad al rostro. Su abordaje integral ayuda a redefinir los contornos faciales, suavizar los signos de cansancio y potenciar un visible efecto lifting natural, convirtiéndolo en una excelente opción para quienes buscan resultados visibles en poco tiempo.</p>
   <p>La sesión combina técnicas manuales inspiradas en la kinesiología, la osteopatía y la biomecánica facial con un protocolo de renovación e hidratación cutánea. Este trabajo favorece la liberación de tensiones musculares, el drenaje de líquidos retenidos, la revitalización de los tejidos y la mejora de la tonicidad facial.</p>
   <p>Además, contribuye a renovar la superficie de la piel, optimizar la absorción de activos cosméticos y aportar hidratación, frescura y confort cutáneo.</p>
   <p>El resultado es un rostro más luminoso, definido y revitalizado, con una apariencia más descansada y un visible efecto lifting natural.</p>
   <p>Ideal para quienes desean recuperar frescura y luminosidad, suavizar los signos de cansancio y lucir un rostro más descansado, firme y radiante, especialmente antes de un evento o una ocasión especial.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">TRATAMIENTO PARA ACNÉ</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Equilibrio, calma y cuidado especializado para pieles con tendencia acneica</p>
   <p>El acné es una alteración de la piel que puede manifestarse a través de comedones, puntos negros, pústulas, exceso de oleosidad, inflamación y enrojecimiento, afectando no sólo el equilibrio cutáneo sino también la confianza y el bienestar personal.</p>
   <p>Este tratamiento está diseñado para acompañar a las pieles con tendencia acneica mediante un abordaje profesional orientado a limpiar profundamente la piel, desobstruir los poros y favorecer la recuperación de su equilibrio natural.</p>
   <p>A través de técnicas específicas se realiza la extracción de comedones y pústulas, ayudando a descongestionar la piel y mejorar su aspecto general. Además, incorpora procedimientos y activos seleccionados para disminuir el enrojecimiento, aliviar la irritación, reducir la inflamación y favorecer una piel más confortable, uniforme y saludable.</p>
   <p>Más allá de mejorar las imperfecciones visibles, el objetivo es ayudar a restaurar la calidad de la piel y acompañar el bienestar y la confianza que surgen cuando la piel recupera su equilibrio.</p>
   <p>Ideal para personas con tendencia acneica que buscan una piel más equilibrada, confortable y saludable, y recuperar la confianza que nace al sentirse bien con su imagen.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">TRATAMIENTO PARA ROSÁCEA</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Calma, protección y bienestar para pieles sensibles y reactivas</p>
   <p>La rosácea es una alteración de la piel caracterizada por enrojecimiento persistente, sensibilidad, sensación de calor e irritación, que puede intensificarse frente a factores como la exposición solar, los cambios de temperatura, el estrés, el alcohol o los alimentos picantes.</p>
   <p>Este tratamiento está diseñado para ayudar a calmar la piel, disminuir el enrojecimiento visible y fortalecer la barrera cutánea mediante procedimientos y activos especialmente seleccionados para pieles sensibles y reactivas.</p>
   <p>Su objetivo es favorecer una piel más equilibrada, hidratada y confortable, ayudando a reducir la sensación de irritación y mejorar su tolerancia frente a los factores que habitualmente desencadenan los brotes.</p>
   <p>Ideal para personas con rosácea, enrojecimiento persistente, sensibilidad cutánea o piel reactiva que buscan recuperar confort, bienestar y equilibrio en su piel.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">PEELING FACIAL</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Renovación celular para mejorar la textura de la piel, unificar el tono y suavizar líneas finas</p>
   <p>Con el paso del tiempo, la exposición solar, los cambios hormonales y otros factores pueden favorecer la aparición de hiperpigmentaciones, líneas finas e irregularidades visibles en la textura y el tono de la piel.</p>
   <p>El peeling facial es un tratamiento orientado a estimular el proceso natural de renovación celular mediante una exfoliación controlada que favorece el recambio de las capas más superficiales de la piel. Este proceso ayuda a mejorar progresivamente la textura, suavidad y aspecto general del rostro.</p>
   <p>Al favorecer el recambio celular, contribuye a atenuar hiperpigmentaciones superficiales, suavizar líneas finas de expresión y optimizar la absorción de los activos cosméticos utilizados posteriormente, potenciando los resultados del cuidado domiciliario.</p>
   <p>La intensidad y el tipo de peeling se seleccionan de manera personalizada según las características y necesidades de cada persona.</p>
   <p>Ideal para quienes desean mejorar la textura y luminosidad de la piel, unificar el tono, suavizar líneas finas y potenciar los resultados de su rutina de cuidado facial.</p>
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
