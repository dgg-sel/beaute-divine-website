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
                    <p className="text-on-surface-variant">Av. Santa Fe 782, Acassuso<br/>San Isidro, Buenos Aires</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">call</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">WhatsApp</p>
                    <p className="text-on-surface-variant">+54 911 4413 3627</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">mail</span>
                  <div className="font-body-md">
                    <p className="font-bold text-primary">Email</p>
                    <p className="text-on-surface-variant">marcelahilu@hotmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-primary/20 flex gap-4">
                <Link className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md" href="https://instagram.com/beautedivine" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined">camera_alt</span>
                </Link>
                <Link className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-md" href="https://facebook.com/beautedivine" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined">face_nod</span>
                </Link>
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
                <iframe src="https://maps.google.com/maps?q=Marcela+Hil%C3%BA+Beauty+%26+Health&t=&z=17&ie=UTF8&iwloc=&output=embed" className="absolute inset-0 w-full h-full grayscale-[50%] contrast-75 hover:grayscale-0 transition-all duration-700" style={{border: 0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </main>
  );
}

