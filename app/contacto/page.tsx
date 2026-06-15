import Link from 'next/link';

export default function ContactoPage() {
  return (
    <main className="bg-surface pt-24 lg:pt-32 pb-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-container-max mx-auto px-4 md:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Title & Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="">
              <h1 className="font-display-lg text-4xl lg:text-5xl text-primary mb-6">Contacto</h1>
              <p className="font-body-lg text-body-lg text-secondary">
                Encuentra tu centro. Estamos aquí para acompañarte en tu viaje hacia la radiancia sagrada y el bienestar holístico.
              </p>
            </div>

            {/* Info Cards */}
            <div className="bg-secondary-container/30 p-8 border border-primary/10 rounded-2xl shadow-sm">
              <h3 className="font-headline-md text-2xl text-secondary mb-6">Nuestros Datos</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">Ubicación</p>
                    <a href="https://maps.google.com/maps?q=Marcela+Hil%C3%BA+Beauty+%26+Health&z=18" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors block">
                      Av. Santa Fe 782, Acassuso<br/>San Isidro, Buenos Aires
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-primary mt-1"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">WhatsApp</p>
                    <a href="https://wa.me/5491144133627" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors block">
                      +54 911 4413 3627
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">mail</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">Email</p>
                    <a href="mailto:marcelahilu@hotmail.com" className="text-on-surface-variant hover:text-primary transition-colors block">
                      marcelahilu@hotmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/20 flex gap-4">
                <a className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md" href="https://instagram.com/beautedivine.espace" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
            
            {/* Image replaced hero */}
            <div className="relative h-[240px] w-full rounded-2xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-cover bg-center" data-alt="Serene spa environment" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjBvtDWzQa8pjYR2qBusDCIPuZLBWZ4sehvMM0WRaP1YCRNVZBLn1U4MkE6qwBMX1mGgprXrp7I1g6ineBXJ6aTl3qj1TsTf5MSc8uD4iqSKIdkxNCUPE-iRxMYioj1FOyl5dOlXuhYx5Ua7hcxg-3dkZl8eWXMksR7tGcjo6HftVjNMGUECx_rK2KU4ZU_v8XiOBPjoheG5JvQ5qejsGc3AJvIqE_tADytM9AwpgreK4QW9TIPth1W8A__RVS6EHU3ZTYCO00kwY')" }}></div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white p-8 md:p-10 border border-primary/10 shadow-lg rounded-2xl">
              <h2 className="font-headline-lg text-3xl text-primary mb-8">Envíanos un Mensaje</h2>
              <form action="https://formsubmit.co/marcelahilu@hotmail.com" method="POST" className="space-y-6" id="contactForm">
                <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Beauté Divine" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Nombre</label>
                    <input className="input-elegant w-full font-body-md bg-surface/50 border-primary/20 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Tu nombre completo" type="text" name="nombre" required />
                  </div>
                  <div className="relative">
                    <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Correo Electrónico</label>
                    <input className="input-elegant w-full font-body-md bg-surface/50 border-primary/20 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="email@ejemplo.com" type="email" name="email" required />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Servicio de Interés</label>
                  <select className="input-elegant w-full font-body-md appearance-none bg-surface/50 border-primary/20 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" name="servicio">
                    <option>Masaje Fit Massage</option>
                    <option>Facial Holístico</option>
                    <option>Consulta de Bienestar</option>
                    <option>Otro</option>
                  </select>
                </div>
                
                <div className="relative">
                  <label className="font-label-sm text-label-sm uppercase text-outline mb-2 block">Tu Mensaje</label>
                  <textarea className="input-elegant w-full font-body-md resize-none bg-surface/50 border-primary/20 rounded-lg p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="¿Cómo podemos ayudarte?" rows={5} name="mensaje" required></textarea>
                </div>
                
                <button className="bg-primary text-on-primary px-10 py-4 font-label-sm text-label-sm uppercase w-full hover:opacity-90 active:scale-95 transition-all rounded-lg shadow-md hover:shadow-lg" type="submit">
                  Enviar Mensaje
                </button>
              </form>
            </div>
            
            {/* Map and Horarios below the form on desktop, or side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Horarios */}
              <div className="bg-surface-variant/30 p-6 md:p-8 rounded-2xl border border-primary/10 flex flex-col justify-center">
                <span className="font-label-sm text-label-sm uppercase text-primary mb-2 block">Horarios</span>
                <div className="space-y-3 font-body-md mt-4">
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-secondary">Lun — Vie</span>
                    <span className="text-primary font-medium">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span className="text-secondary">Sábados</span>
                    <span className="text-primary font-medium">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Domingos</span>
                    <span className="text-primary italic font-light">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[200px] md:h-full min-h-[200px] w-full bg-surface-variant overflow-hidden rounded-2xl shadow-sm border border-primary/10 group">
                <iframe src="https://maps.google.com/maps?q=Marcela+Hil%C3%BA+Beauty+%26+Health&t=&z=18&ie=UTF8&iwloc=&output=embed" className="absolute inset-0 w-full h-full grayscale-[50%] contrast-75 hover:grayscale-0 transition-all duration-700" style={{border: 0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </main>
  );
}

