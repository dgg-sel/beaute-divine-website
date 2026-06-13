import Link from 'next/link';

export default function ContactoPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[614px] flex items-center justify-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center opacity-40 mix-blend-multiply" data-alt="A serene spa environment with soft sunlight filtering through sheer linen curtains, casting gentle shadows over a minimalist treatment table. The color palette is a sophisticated mix of off-whites and golden highlights, reflecting a high-end luxury wellness aesthetic. The atmosphere is quiet and ethereal, emphasizing sacred radiance and tranquil space." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjBvtDWzQa8pjYR2qBusDCIPuZLBWZ4sehvMM0WRaP1YCRNVZBLn1U4MkE6qwBMX1mGgprXrp7I1g6ineBXJ6aTl3qj1TsTf5MSc8uD4iqSKIdkxNCUPE-iRxMYioj1FOyl5dOlXuhYx5Ua7hcxg-3dkZl8eWXMksR7tGcjo6HftVjNMGUECx_rK2KU4ZU_v8XiOBPjoheG5JvQ5qejsGc3AJvIqE_tADytM9AwpgreK4QW9TIPth1W8A__RVS6EHU3ZTYCO00kwY')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display-lg text-display-lg text-primary mb-4 reveal">Entra en el Espacio</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto reveal">Encuentra tu centro. Estamos aquí para acompañarte en tu viaje hacia la radiancia sagrada y el bienestar holístico.</p>
        </div>
      </section>
      {/* Contact Grid (Bento Style) */}
      <section className="max-w-container-max mx-auto px-8 py-section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-12 reveal border border-primary/10 shadow-sm">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Conecta con Nosotros</h2>
            <form action="https://formsubmit.co/marcelahilu@hotmail.com" method="POST" className="space-y-10" id="contactForm">
              <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Beauté Divine" />
              <input type="hidden" name="_template" value="table" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Nombre</label>
                  <input className="input-elegant w-full font-body-md" placeholder="Tu nombre completo" type="text" name="nombre" required />
                </div>
                <div className="relative">
                  <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Correo Electrónico</label>
                  <input className="input-elegant w-full font-body-md" placeholder="email@ejemplo.com" type="email" name="email" required />
                </div>
              </div>
              <div className="relative">
                <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Servicio de Interés</label>
                <select className="input-elegant w-full font-body-md appearance-none" name="servicio">
                  <option>Masaje Fit Massage</option>
                  <option>Facial Holístico</option>
                  <option>Consulta de Bienestar</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="relative">
                <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Tu Mensaje</label>
                <textarea className="input-elegant w-full font-body-md resize-none" placeholder="¿Cómo podemos ayudarte?" rows={4} name="mensaje" required></textarea>
              </div>
              <button className="bg-primary text-on-primary px-12 py-4 font-label-sm text-label-sm uppercase w-full md:w-auto hover:opacity-90 active:scale-95 transition-all" type="submit">
                Enviar Mensaje
              </button>
            </form>
          </div>
          {/* Right Column: Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            {/* Info Cards */}
            <div className="bg-secondary-container/30 p-10 reveal border border-primary/10">
              <h3 className="font-headline-md text-headline-md text-secondary mb-6">Detalles de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">Nuestra Ubicación</p>
                    <p className="text-on-surface-variant">Av. Santa Fe 782<br/>Acassusso<br/>San Isidro, Buenos Aires</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">WhatsApp</p>
                    <p className="text-on-surface-variant">+54 911 4413 3627</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">Email</p>
                    <p className="text-on-surface-variant">marcelahilu@hotmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/20">
                <p className="font-label-sm text-label-sm uppercase text-outline mb-4">Síguenos</p>
                <div className="flex gap-4">
                  <Link className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="https://instagram.com/beautedivine" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined">camera_alt</span>
                  </Link>
                  <Link className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="https://facebook.com/beautedivine" target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined">face_nod</span>
                  </Link>
                </div>
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="relative h-full min-h-[300px] w-full bg-surface-variant overflow-hidden reveal group">
              <iframe src="https://maps.google.com/maps?q=Av.+Santa+Fe+782,+Acassuso,+San+Isidro,+Buenos+Aires&t=&z=15&ie=UTF8&iwloc=&output=embed" className="absolute inset-0 w-full h-full grayscale contrast-75 hover:grayscale-0 transition-all duration-700" style={{border: 0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Atmosphere Section */}
      <section className="bg-surface py-section-padding border-t border-primary/10 overflow-hidden">
        <div className="max-w-container-max mx-auto px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="reveal">
            <span className="font-label-sm text-label-sm uppercase text-primary mb-4 block">Horarios de Apertura</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Momentos para ti</h2>
            <div className="space-y-4 font-body-lg">
              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span>Lunes — Viernes</span>
                <span className="text-primary">09:00 - 20:00</span>
              </div>
              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span>Sábados</span>
                <span className="text-primary">10:00 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-primary/10 pb-2">
                <span>Domingos</span>
                <span className="text-primary italic font-light">Cerrado por descanso</span>
              </div>
            </div>
          </div>
          <div className="relative reveal delay-200">
            <div className="aspect-square bg-cover bg-center rounded-full border-[12px] border-white shadow-2xl" data-alt="Close-up of high-quality organic facial oils in delicate glass bottles sitting on a polished stone surface. Soft sunlight catches the golden liquid and the smooth edges of the glass, creating a sense of luxury and purity. The background is softly blurred to focus on the tactile textures of the products, following a sacred wellness and radiant beauty theme." style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMYY_8IEr4GqimcepwxpPzDF4b_KRG1GChlmdrArSTssNuUIGuitWGqRNZJ7FZKNj2GkHqTHCiAO4lbFnno5aryS4pwFcBMtej6uChwXH-fslA9km-mJy-B_X0JcCgRFIlo7ATajObaR-0Uv5-Ka8rVAmQarF9zUb7rbn-oPgsvimyykPKay5f2rpOUYAT8ZgAx8w9yNMqdZpGGBTnz25QmbOLqu2VIi0KxQE9RZYKr5Z-NTUJ5fgl0Nm53IQPwYoyg6fI1On5hRA')" }}></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary-container/50 rounded-full -z-10 blur-xl"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
