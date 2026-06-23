import Link from 'next/link';

export default function TratamientosCorporalesPage() {
 return (
 <main className="pt-20">
 {/* Hero Section */}
 <section className="max-w-container-max mx-auto px-8 mb-16 text-center">
 <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Servicios Especializados</span>
 <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface mb-6 italic">Tratamientos Corporales</h1>
 <div className="aspect-video max-w-4xl mx-auto overflow-hidden gold-border mb-8">
 <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCldpHOlSF7D2lKs5wNNfNwtlpES5OKxWg9uVJO1ANYy3HU8qgbb5x2dtPpB_QZSxER4nPocOz5Dh51zJwlFr_PFumOmCbk2VuxnWY8wUPrVHu-AXk_hrM8vzRUchvrjot2sC54GU2LtYsf7uiOP3e4eR2PvFxlCemNUTqNG0w5tlIhZrfSB3AQnDInld2XIinbnl55mcNXSPSj6CzkmrQAfrRr9XsdVeUPYccXoek6SEZ7PmqsX3H94HrBUVf4z8ylP2FsFIeqfYg" alt="Tratamientos Corporales" />
 </div>
 </section>

 {/* Services Grid */}
 <section className="max-w-container-max mx-auto px-8 mb-section-padding">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Masaje Descontracturante de Cuello y Espalda</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Alivio profundo para las zonas que más sufren el estrés cotidiano</p>
   <p>Las tensiones acumuladas, las largas horas frente a pantallas, las posturas sostenidas y el estrés suelen manifestarse primero en el cuello, los hombros y la espalda alta. Con el tiempo, estas sobrecargas pueden generar contracturas, rigidez, dolor cervical, cefaleas tensionales y una sensación constante de sobrecarga física.</p>
   <p>Este tratamiento está orientado a liberar las tensiones localizadas mediante maniobras específicas que trabajan sobre las zonas musculares más comprometidas, ayudando a disminuir la sobrecarga acumulada y recuperar una mayor sensación de bienestar físico.</p>
   <p>El resultado es una disminución de la rigidez muscular, una sensación de mayor liviandad en la zona tratada y un alivio duradero de las tensiones cotidianas.</p>
   <p>Ideal para personas con tensión en cuello, hombros y espalda alta, que presentan rigidez, molestias musculares o sobrecarga asociada al estrés, las malas posturas y las exigencias de la vida cotidiana.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Masaje Descontracturante Corporal</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Liberación muscular integral para recuperar movilidad y confort</p>
   <p>El cuerpo acumula tensiones de forma constante como respuesta al esfuerzo físico, el estrés, las posturas repetitivas y las exigencias de la vida diaria. Cuando estas tensiones se mantienen en el tiempo pueden generar molestias musculares, pérdida de movilidad y sensación de cansancio corporal.</p>
   <p>Este tratamiento trabaja de manera integral sobre las diferentes cadenas musculares del cuerpo mediante técnicas manuales orientadas a liberar contracturas, disminuir la sobrecarga muscular, favorecer la recuperación de los tejidos y mejorar la movilidad corporal.</p>
   <p>A diferencia del masaje localizado, el abordaje corporal completo permite identificar y tratar tensiones que muchas veces se originan en áreas diferentes a donde aparece la molestia, promoviendo una recuperación más integral del cuerpo.</p>
   <p>El resultado es un cuerpo más relajado, con mayor movilidad, flexibilidad y una agradable sensación de alivio muscular.</p>
   <p>Ideal para personas con tensión muscular, sobrecarga física o rigidez corporal, así como para quienes practican actividad física regularmente y desean mejorar su recuperación y confort muscular.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Masaje Sedativo</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Una pausa para el cuerpo y la mente</p>
   <p>El ritmo acelerado de la vida cotidiana puede mantener al organismo en un estado constante de alerta, generando tensión física, agotamiento mental y dificultad para desconectar.</p>
   <p>El masaje sedativo utiliza maniobras suaves, lentas y envolventes que favorecen una profunda sensación de calma y bienestar, ayudando al cuerpo a disminuir progresivamente los niveles de tensión acumulada.</p>
   <p>Su objetivo no es trabajar contracturas específicas ni realizar un abordaje terapéutico profundo, sino ofrecer un espacio de descanso y reconexión orientado al equilibrio físico y emocional.</p>
   <p>Más que un masaje, es una invitación a detenerse, desacelerar el ritmo cotidiano y regalarse un momento de cuidado personal.</p>
   <p>Ideal para personas que atraviesan períodos de estrés, sobrecarga emocional, cansancio mental o simplemente desean disfrutar de una experiencia de relajación y bienestar.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">NEUROFASCIAL BALANCE</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Liberación fascial y regulación del sistema nervioso para recuperar equilibrio y bienestar</p>
   <p>La fascia es una red de tejido conectivo que conecta y envuelve músculos, órganos, nervios y estructuras corporales, desempeñando un papel fundamental en el movimiento, la postura y la respuesta del organismo frente al estrés.</p>
   <p>Las tensiones físicas, emocionales y posturales pueden generar restricciones fasciales que afectan la movilidad de los tejidos y favorecen estados prolongados de tensión, sobrecarga y malestar.</p>
   <p>Neurofascial Balance es un abordaje manual orientado a liberar estas restricciones mediante técnicas específicas de trabajo fascial que favorecen una mejor movilidad de los tejidos y una respuesta más equilibrada del sistema nervioso.</p>
   <p>A diferencia de un masaje descontracturante, no trabaja únicamente sobre la musculatura, sino también sobre las conexiones fasciales que influyen en la postura, la respiración y el bienestar general del organismo.</p>
   <p>Muchas personas experimentan después de la sesión una sensación de mayor amplitud corporal, respiración más libre, relajación profunda y una renovada percepción de equilibrio físico y emocional.</p>
   <p>Ideal para quienes presentan estrés físico o emocional, tensión acumulada, rigidez corporal o sensación de sobrecarga, y buscan recuperar bienestar desde una mirada integral del cuerpo.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Drenaje Linfático Corporal</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Estimulación manual del sistema linfático para favorecer el drenaje, la desinflamación y el bienestar corporal</p>
   <p>El drenaje linfático manual es una técnica suave, precisa y rítmica que estimula el recorrido natural de la linfa, favoreciendo el drenaje de líquidos retenidos y acompañando los procesos fisiológicos mediante los cuales el organismo transporta y elimina sustancias de desecho generadas por el metabolismo celular.</p>
   <p>A diferencia de otros masajes, no trabaja sobre la musculatura profunda, sino sobre el sistema linfático, contribuyendo al equilibrio de los líquidos corporales y a una mayor sensación de bienestar.</p>
   <p>Es un tratamiento especialmente indicado para personas que presentan retención de líquidos, sensación de inflamación, piernas pesadas o que desean complementar programas corporales. También puede acompañar procesos postoperatorios cuando cuentan con indicación médica.</p>
   <p>El resultado es una agradable sensación de ligereza, desinflamación y bienestar general.</p>
   <p>Ideal para personas con retención de líquidos, hinchazón, sensación de pesadez o que desean favorecer el drenaje y la desinflamación del organismo, incluyendo procesos postoperatorios con indicación médica.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Drenaje Linfático de Miembros Inferiores</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Piernas más livianas mediante la estimulación del sistema linfático</p>
   <p>Las piernas suelen ser una de las zonas donde con mayor frecuencia se acumulan líquidos debido a largas horas de pie, períodos prolongados sentada, cambios hormonales o dificultades en el retorno circulatorio y linfático.</p>
   <p>Este tratamiento está orientado a estimular el sistema linfático mediante maniobras suaves, precisas y rítmicas que favorecen el drenaje de líquidos acumulados y acompañan los procesos fisiológicos naturales a través de los cuales el organismo transporta y elimina sustancias de desecho generadas por el metabolismo celular.</p>
   <p>A diferencia del drenaje corporal completo, el trabajo se concentra exclusivamente en piernas y pies, permitiendo un abordaje específico sobre las zonas donde suelen manifestarse la hinchazón, la pesadez y la sensación de cansancio.</p>
   <p>El resultado es una agradable sensación de ligereza, descanso y bienestar, con piernas más livianas y confortables.</p>
   <p>Ideal para personas con retención de líquidos, hinchazón en piernas y tobillos, sensación de pesadez o cansancio, o que pasan muchas horas de pie o sentadas.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">FASCIAL FIT REMODELING®</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Remodelación corporal integral mediante trabajo fascial, drenaje neuro-linfático y abordaje estructural</p>
   <p>El cuerpo funciona como una red interconectada donde las fascias, los músculos, los líquidos corporales y el sistema nervioso trabajan en constante relación. Cuando esta red pierde movilidad, pueden aparecer restricciones tisulares, alteraciones en el drenaje y tensiones que influyen tanto en la forma corporal como en el bienestar general.</p>
   <p>Fascial Fit Remodeling® es un método de remodelación corporal basado en principios de la osteopatía, la kinesiología y la biomecánica. Combina técnicas específicas de liberación fascial, drenaje neuro-linfático y trabajo estructural orientadas a mejorar la movilidad de los tejidos, favorecer la circulación de líquidos y optimizar la organización corporal.</p>
   <p>A diferencia de los tratamientos reductores tradicionales que se enfocan únicamente en una zona específica, este abordaje considera al cuerpo como una unidad funcional, trabajando sobre estructuras clave como el diafragma, las cadenas fasciales y las zonas donde suelen acumularse restricciones que afectan el drenaje, la postura y el movimiento.</p>
   <p>Al mejorar la movilidad de los tejidos y favorecer el drenaje neuro-linfático, el tratamiento contribuye a disminuir la sensación de inflamación y pesadez, mejorar la circulación de líquidos, favorecer la reducción de adiposidad localizada y optimizar la definición de la silueta.</p>
   <p>Ideal para personas que desean favorecer la remodelación corporal, mejorar el drenaje de líquidos, reducir la sensación de inflamación y pesadez, y lograr una silueta más armónica y definida desde una mirada integral.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Relax & Drain</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Alivio de tensiones y piernas más livianas en una misma sesión</p>
   <p>Relax & Drain combina dos de los tratamientos más elegidos para combatir los efectos del estrés, las posturas sostenidas y la retención de líquidos.</p>
   <p>La sesión comienza con un trabajo descontracturante en cuello, hombros y espalda, orientado a liberar tensiones musculares, aliviar la rigidez y mejorar el confort de las zonas que suelen acumular mayor carga física y emocional.</p>
   <p>A continuación, se realiza un drenaje linfático en miembros inferiores mediante maniobras suaves y específicas que favorecen la circulación linfática y ayudan a disminuir la sensación de pesadez e hinchazón en las piernas.</p>
   <p>La combinación de ambas técnicas permite aliviar la tensión acumulada en la parte superior del cuerpo y recuperar una agradable sensación de ligereza y bienestar en las piernas.</p>
   <p>El resultado es una experiencia profundamente reparadora que aporta alivio muscular, liviandad y bienestar integral.</p>
   <p>Ideal para personas con tensión en cuello, hombros y espalda, piernas cansadas o pesadas, o que desean combinar alivio muscular y drenaje corporal en una misma sesión.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Presoterapia Secuencial</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Compresión secuencial mediante botas neumáticas para favorecer la circulación y el bienestar corporal</p>
   <p>La presoterapia secuencial es un tratamiento que utiliza botas neumáticas de compresión progresiva diseñadas para estimular la circulación venosa y linfática de forma cómoda, segura y no invasiva.</p>
   <p>Durante la sesión, las diferentes cámaras de aire se inflan y desinflan siguiendo una secuencia específica desde los pies hacia la parte superior de las piernas, generando un efecto de bombeo que favorece los procesos naturales de drenaje del organismo.</p>
   <p>Además de sus beneficios circulatorios, es una excelente herramienta complementaria dentro de programas de remodelación corporal y drenaje, aportando una agradable sensación de ligereza, confort y bienestar.</p>
   <p>La sesión resulta especialmente relajante, convirtiéndose en un momento de pausa y recuperación para el cuerpo.</p>
   <p>Ideal para quienes desean recuperar una sensación de ligereza y descanso en las piernas, complementar tratamientos corporales y disfrutar de una experiencia confortable de bienestar y autocuidado.</p>
 </div>
 <div className="flex items-center justify-between mt-8 border-t border-primary/10 pt-4">
 <Link href="/contacto" className="font-label-sm text-[10px] uppercase text-on-surface-variant tracking-widest hover:text-primary transition-colors">Consultar</Link>
 </div>
 </div>

 <div className="bg-surface-container-low gold-border p-8 service-card flex flex-col md:col-span-2">
 <h3 className="font-headline-md text-headline-md mb-4 text-primary">Day Spa</h3>
 <div className="font-body-md text-body-md text-on-surface-variant grow space-y-4">
   <p className="font-bold text-primary">Una experiencia integral de bienestar, recuperación corporal y revitalización facial</p>
   <p>Day Spa es una experiencia diseñada para quienes desean regalarse un momento de cuidado profundo, combinando bienestar corporal y revitalización facial en una misma sesión.</p>
   <p>La experiencia incluye un masaje descontracturante corporal completo para liberar tensiones musculares, una sesión de presoterapia secuencial que favorece la circulación y la sensación de ligereza en las piernas, y un masaje facial rejuvenecedor orientado a revitalizar la expresión, mejorar la luminosidad de la piel y favorecer una apariencia más descansada.</p>
   <p>La combinación de estas técnicas permite disfrutar de una experiencia completa de relajación, recuperación corporal y cuidado facial, favoreciendo una sensación integral de bienestar.</p>
   <p>Más que un tratamiento, Day Spa es una invitación a hacer una pausa, reconectar con uno mismo y dedicar un tiempo de calidad al cuidado personal.</p>
   <p>Ideal para quienes desean desconectar del estrés cotidiano, recuperar energía y disfrutar de una experiencia completa de bienestar y autocuidado.</p>
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
