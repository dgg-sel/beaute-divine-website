import Link from 'next/link';

export default function FasciasPage() {
  return (
    <main>
      <header className="relative min-h-[921px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" data-alt="A serene high-end spa treatment room with soft sunlight streaming through linen curtains. The atmosphere is ethereal and calming, featuring a minimalist massage table, soft gold accents on the walls, and a palette of warm off-whites and light wood tones. The focus is on luxury and professional holistic wellness in a modern Argentine setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSR_ThDa3izW0_2tcfejvho2vMpxSIEE5vPvKzwNu6oMSV1ad1EuUnHx_7kkXF69GXxX8Yi7Kl_tQB443DfvsoKznXlDeobmNGWEzzB8R6MwWrVlUdJ7V1EwrpC2qun2AEjx3YQ_iTLhBjepWIgcJqXQHBZyFTstjrWD_SAThTlnzZ13qCD5VZN8JiX3SrzaBEk_UZl5_veEp0o_f5qRG99awYGVmOM9wOEHN2ulSNnFCcKcTLuUHwhtjWqrRtEkj9GtN8EuDmkko" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-6 block opacity-0 translate-y-4 animate-[fadeInUp_1s_ease_forwards]">Exclusividad en Argentina</span>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-8 opacity-0 translate-y-4 animate-[fadeInUp_1s_0.2s_ease_forwards]">Fascias: El Arte de la Escultura Consciente</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto opacity-0 translate-y-4 animate-[fadeInUp_1s_0.4s_ease_forwards]">
            Una técnica revolucionaria que fusiona el drenaje linfático profundo con maniobras de remodelación muscular, diseñada para quienes buscan resultados visibles sin sacrificar la paz interior.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-4 animate-[fadeInUp_1s_0.6s_ease_forwards]">
            <Link className="bg-primary text-on-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:opacity-90 transition-all" href="#booking">Reservar Sesión</Link>
            <Link className="border border-primary text-primary px-10 py-5 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/5 transition-all" href="#method">Descubrir Técnica</Link>
          </div>
        </div>
      </header>

      {/* The Method (Asymmetric Bento Grid) */}
      <section className="py-[120px] px-8 max-w-[1200px] mx-auto" id="method">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">El Método Divine</span>
            <h2 className="font-headline-lg text-headline-lg mb-8">¿Por qué Fascias es único?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              A diferencia de los masajes convencionales, el Fascias trabaja en las capas más profundas de la fascia y el tejido muscular. Es una coreografía de presión rítmica que reactiva el metabolismo celular.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-body-md text-body-md">Reducción inmediata de la retención de líquidos.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-body-md text-body-md">Definición de contornos musculares y firmeza cutánea.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-body-md text-body-md">Liberación de tensiones acumuladas y estrés sistémico.</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] overflow-hidden rounded-lg gold-border-glow">
              <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="A close-up of professional hands performing a sculpting massage technique on a person's skin, using organic gold-tinted oils. The lighting is soft and warm, highlighting the texture of the skin and the fluid movement of the hands. Modern minimalist spa aesthetic with a focus on tactile elegance and luxury wellness." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkUjO-Fb2nbj-0wFztO5ws8CV9xpUBplilDD5I5GoEdj7MV5BLQh5dgiKS5j3AMZYpiqPrLfq4OEYzyoZcgSMl6ucPE8W6o1P2ykET2MvtL184xmNtCCpAJ2B8bY687gGbCv0k1aMvgmM5zBQ7FB-yyZs2rpT2EJp8DeOo5adQBGNZJ6xw02tWvsT4OxgYdl1O83Lm-N8PnGe0baUUK_CSeO5GrNxdSxvC82N27BM_A-RsgluUR90ztzfn71JY1bzmvjUzQpUHkuI" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg mt-12 gold-border-glow">
              <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" data-alt="A beautifully arranged wellness tray with crystal decanters of essential oils, a small branch of eucalyptus, and a rolled-up white towel on a light stone surface. The scene is bathed in bright natural light, reflecting a sacred radiance and holistic wellness atmosphere typical of a high-end luxury spa." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwsjveySlkwuZzfYYeV4RgfC0gE6O11huXnd8338Y6rYfPphpw8xT7BpMEvF0RudFPm5IMzm_ZAqKS2ISwAW0KCL1AWfrOlMt-3Lg4yyM5cUtQ6cgxKsaLYeCCq3fo8rUXem5dcs1vbu5RNCjNSxwpT3qn90JveZI0Paiwc_GdJHkr3Msl_bThOTGENcnL0WfVGLTIhB49RZWjEnyrIyK4ulrSio9mgEUCenZ69zDlocIyOoW3Fn5BSU7asKxZPw8KD-HZ8xtZT-w" />
            </div>
          </div>
        </div>
      </section>
      {/* Benefits (Glassmorphism Cards) */}
      <section className="bg-surface-container-low py-[120px] px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-headline-lg text-headline-lg mb-4">Transformación Holística</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">Resultados que se sienten en el cuerpo y se reflejan en el espíritu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-10 bg-surface/50 backdrop-blur-md gold-border-glow hover:bg-primary-container/10 transition-colors duration-500 group">
              <div className="w-12 h-12 bg-primary-container/20 flex items-center justify-center rounded-full mb-8 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                <span className="material-symbols-outlined">water_drop</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">Detox Profundo</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Estimula el sistema linfático para eliminar toxinas y reducir la inflamación de forma natural y acelerada.</p>
            </div>
            {/* Card 2 */}
            <div className="p-10 bg-surface/50 backdrop-blur-md gold-border-glow hover:bg-primary-container/10 transition-colors duration-500 group">
              <div className="w-12 h-12 bg-primary-container/20 flex items-center justify-center rounded-full mb-8 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                <span className="material-symbols-outlined">fitness_center</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">Tono Muscular</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Maniobras de alta intensidad que esculpen la silueta y mejoran la oxigenación de los tejidos musculares.</p>
            </div>
            {/* Card 3 */}
            <div className="p-10 bg-surface/50 backdrop-blur-md gold-border-glow hover:bg-primary-container/10 transition-colors duration-500 group">
              <div className="w-12 h-12 bg-primary-container/20 flex items-center justify-center rounded-full mb-8 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                <span className="material-symbols-outlined">self_improvement</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-4">Calma Mental</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Aunque es una técnica activa, el ritmo induce a un estado de relajación profunda y claridad mental.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Experience Section (Full Width with Overlay) */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <img className="absolute inset-0 w-full h-full object-cover" data-alt="A wide-angle artistic shot of a high-end wellness sanctuary in Buenos Aires. The architecture is modern and minimal, with large glass windows overlooking a serene garden. Inside, the furniture is curated and elegant, with soft lighting and a tranquil vibe. The color palette consists of cream, beige, and subtle gold highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZDqQ4f_oJHaTKIRLU8_BAmR7G_pHxq3NDnFM-58n1wxGduaSwqrW23MH8Do1sUeDYSTqRptnTyOXeikp5bL1inHQdXhdves7kUF3MYQiB4-ViUQZaUTEpksxpEFPQBMJ9az8LXDEaXonQtwCG-eH7VWtG58szF0K_l-7nlSfXkqqnF90hgBFGlcIbdz6IBlh_Bax7oElhsfWhw1L8WCS0ztF3ObrbrUh4qslFcPbylkLcBHO1fBVGxZC9D5T4r5GmppN7kPCZXOU" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 w-full">
          <div className="max-w-xl text-white">
            <span className="font-label-sm text-label-sm uppercase tracking-widest mb-6 block text-primary-fixed">La Experiencia</span>
            <h2 className="font-headline-lg text-headline-lg mb-8">Un santuario de bienestar en el corazón de la ciudad.</h2>
            <p className="font-body-lg text-body-lg mb-10 opacity-90">
              Cada sesión de Fascias en Beauté Divine es un ritual personalizado. Utilizamos aceites esenciales de grado terapéutico y técnicas manuales exclusivas desarrolladas para el cuerpo contemporáneo.
            </p>
            <div className="flex gap-4 items-center">
              <span className="font-label-sm text-label-sm font-bold">DURACIÓN: 60 / 90 MIN</span>
              <div className="h-px w-12 bg-primary-fixed"></div>
              <span className="font-label-sm text-label-sm font-bold">PRECIO: CONSULTAR</span>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-[120px] px-8 text-center bg-surface" id="booking">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-headline-lg mb-6">Comienza tu transformación hoy.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-12">
            Las plazas son limitadas debido a la exclusividad de la técnica. Reserva tu cita para una evaluación personalizada y descubre el poder del Fascias.
          </p>
          <form action="https://formsubmit.co/marcelahilu@hotmail.com" method="POST" className="space-y-8 text-left max-w-md mx-auto mb-12">
            <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Beauté Divine" />
            <input type="hidden" name="_template" value="table" />
            <div>
              <label className="font-label-sm text-label-sm text-primary mb-2 block">Nombre Completo</label>
              <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:ring-0 focus:border-primary transition-colors py-3 px-0 placeholder:text-on-surface-variant/40" placeholder="Ej: Martina Rossi" type="text" />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-primary mb-2 block">Email de Contacto</label>
              <input className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/40 focus:ring-0 focus:border-primary transition-colors py-3 px-0 placeholder:text-on-surface-variant/40" placeholder="martina@ejemplo.com" type="email" name="email" />
            </div>
            <button className="w-full bg-primary text-on-primary py-5 font-label-sm text-label-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all mt-4" type="submit">
              Solicitar Turno
            </button>
          </form>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">Ubicado en Palermo Soho, Buenos Aires.</p>
        </div>
      </section>
    </main>
  );
}
