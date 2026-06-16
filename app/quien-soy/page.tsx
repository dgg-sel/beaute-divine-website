import Link from 'next/link';

export default function QuienSoyPage() {
  return (
    <main className="min-h-[884px]" data-stitch-vh="min-h-[884px]===min-h-screen">
      {/* Hero Section / Personal Intro */}
      <section className="max-w-container-max mx-auto px-8 pt-20 pb-section-padding transition-all duration-1000 opacity-100 translate-y-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="relative group">
              <div className="absolute -inset-4 border border-primary/20 transition-all duration-500 group-hover:inset-0"></div>
              <img alt="Portrait de la fondatrice" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 soft-gold-glow relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAYCadEW7HV-Pvcyr5RybZZBiovyslRZ46cNrwjckErRc_yLnkorxRN3Kxs5g1rxfMatGS5fYXcaiwW4geJouFReteyQYVIuOqP_no9dvIpZVL6XO5JbAfpVrPyY9hOyawgTn6E7p9azQ-SqmJ97ef2seKfmsaEp2vGi-_GVIOHui7RhYTb-ewwert-sqjpuGcLTN8mD0sPaRW01ClVjmA7ioT-Ppl9s6FXHaTA2br7Wn5O3chU2qOMz0nPAYJzepMeFBgzJBn-Gs" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-container/10 -z-0"></div>
            </div>
            <div className="grid grid-cols-1 gap-8 mt-4">
              <div className="p-6 bg-surface-container-low border border-primary/10">
                <h3 className="font-headline-md text-headline-md text-primary mb-2 italic">Misión</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Acompañar procesos de transformación y bienestar, a través de tratamientos faciales, corporales y energéticos personalizados, promoviendo la armonía entre cuerpo, mente y alma, para que cada persona pueda sentirse y verse en su mejor versión.</p>
              </div>
              <div className="p-6 bg-surface-container-low border border-primary/10">
                <h3 className="font-headline-md text-headline-md text-primary mb-2 italic">Visión</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Inspirar una forma más consciente de vivir la belleza y el bienestar, comprendiendo al ser humano como un todo. Mi visión es promover un abordaje integrativo que armonice cuerpo, mente y alma, respetando y acompañando los procesos naturales del cuerpo para favorecer el equilibrio, el bienestar y una conexión más profunda con uno mismo.</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col gap-8">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] mb-4 block">Fundadora &amp; Especialista</span>
              <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface">Marcela Hilú</h1>
            </div>
            <div className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl flex flex-col gap-4">
              <p>Desde siempre sentí una profunda fascinación por el mundo de la belleza: la cosmética, las fragancias, el maquillaje y la alquimia que los une.</p>
              <p>Mi camino comenzó con mi formación como maquilladora profesional y continuó con estudios en cosmetología, cosmiatría, estética y masoterapia.</p>
              <p>A partir de allí, me desarrollé asesorando y comercializando marcas de dermocosmética y cosmética de lujo —como La Roche-Posay, Avène, Eucerin, Lancôme, Clarins y Orlane, entre otras— para empresas nacionales e internacionales.</p>
              <p>Esta experiencia me permitió conocer profundamente la piel, sus necesidades y sus cuidados.</p>
              <p>También me desempeñé como responsable del área de estética en distintos centros, diseñando e implementando protocolos estéticos y experiencias de spa.</p>
              <p>Paralelamente, mi alma me guiaba por otro camino: el de la espiritualidad, las terapias energéticas y la evolución del ser.<br />
              Me formé como Maestra en Reiki Usui y estudié Tarot Egipcio, Rider Waite, ThetaHealing®️, Lectura de Registros Akáshicos, Tameana y otras técnicas energéticas, hasta encontrar mi propio camino: Sanación en Luz, un profundo proceso de transformación personal que me permitió desarrollar una nueva mirada sobre la belleza.</p>
              <p>Hoy, todo ese recorrido converge en una visión integrativa que deseo compartir con el mundo.</p>
              <p>Para mí, la belleza es una frecuencia.</p>
              <p>Un estado de consciencia que trasciende lo meramente físico. Es la luz que emerge cuando vivimos en coherencia con quienes somos. Y aunque puede reflejarse en el exterior, su origen se encuentra en lo más profundo de nuestro ser.<br />
              Por eso, mi propuesta va más allá de los tratamientos estéticos. Integra el trabajo con el cuerpo, la mente, las emociones y el alma, porque creo que la verdadera transformación ocurre de adentro hacia afuera.</p>
              <p>Te invito a reconectar con tu belleza auténtica, única e irrepetible. Esa que no se encuentra solamente en lo externo, sino que florece desde tu esencia y se expresa en cada etapa de tu evolución.</p>
              <p>Cada encuentro es una oportunidad para honrar tu luz, armonizar tu energía y acompañarte en el camino de manifestar tu belleza más genuina: la que nace cuando te reconocés, te cuidás y te amás en totalidad.</p>
              <p>Te extiendo mi mano para recorrer este hermoso camino juntos/as!</p>
            </div>
          </div>
        </div>
      </section>
      {/* Expertise Section */}
      <section className="bg-secondary-container/20 py-section-padding transition-all duration-1000 opacity-100 translate-y-0">
        <div className="max-w-container-max mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Mi Especialidad</h2>
            <div className="w-24 h-px bg-primary mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-surface p-8 border border-primary/5 hover:border-primary/20 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block" data-icon="auto_awesome">auto_awesome</span>
              <h3 className="font-headline-md text-headline-md mb-4">Fit Massage</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Una técnica exclusiva diseñada para esculpir el cuerpo mientras se libera la tensión acumulada en las fibras musculares profundas.</p>
              <Link className="font-label-sm text-label-sm text-primary uppercase tracking-widest reveal-border pb-1" href="/tratamientos-corporales">Saber Más</Link>
            </div>
            {/* Card 2 */}
            <div className="group bg-surface p-8 border border-primary/5 hover:border-primary/20 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block" data-icon="spa">spa</span>
              <h3 className="font-headline-md text-headline-md mb-4">Holística Facial</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Tratamientos que van más allá de la piel, utilizando aceites esenciales y masajes de drenaje para restaurar el resplandor vital.</p>
              <Link className="font-label-sm text-label-sm text-primary uppercase tracking-widest reveal-border pb-1" href="/tratamientos-faciales">Saber Más</Link>
            </div>
            {/* Card 3 */}
            <div className="group bg-surface p-8 border border-primary/5 hover:border-primary/20 transition-all duration-300">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block" data-icon="psychology_alt">psychology_alt</span>
              <h3 className="font-headline-md text-headline-md mb-4">Bienestar Mental</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Integración de meditación guiada y aromaterapia en cada sesión para asegurar una desconexión total del ruido exterior.</p>
              <Link className="font-label-sm text-label-sm text-primary uppercase tracking-widest reveal-border pb-1" href="/terapias">Saber Más</Link>
            </div>
          </div>
        </div>
      </section>
      {/* Personal Narrative / Quote */}
      <section className="max-w-container-max mx-auto px-8 py-section-padding transition-all duration-1000 opacity-0 translate-y-10">
        <div className="bg-surface-container-lowest p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <img alt="Spa background texture" className="w-full h-full object-cover" data-alt="A macro close-up of a high-end luxury spa setup with smooth stones, a sprig of lavender, and a ceramic bowl of golden oil. The lighting is soft and golden, creating a warm, ethereal glow. The composition is minimalist and elegant, reflecting a serene holistic wellness environment with clean lines and pristine textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_umKJq2fAamRmUFiKBkjdNORAPiEXgx2lL6CLM2bIKtIzeuNSd933FSUwW_8jR5VJWhX131_GqTRw8W_bkBiJNaXCRv6n8Sp-jWjfOZSVcN9wSSr6SalaWpbzwOJtg7qHI4A7P0RyyEx2eXqKL4xXYhXa4hpHvYRynnE6-v7dIlxx0yeULRBgcV4K1PWU40bcLkQzKCHk_OLhf3gRDQPwzegwjUkE9GEZkT81MLLQOG-LSyfyeM9z48PVoPWmlDSyQtdl7krxf3E" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="material-symbols-outlined text-primary-container text-6xl mb-8 block" data-icon="format_quote">format_quote</span>
            <blockquote className="font-headline-lg text-headline-lg italic text-on-surface mb-8">
              "La belleza no es un destino, es la consecuencia natural de un alma en paz y un cuerpo respetado."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-primary"></div>
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Beauté Divine Espace</p>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery / Aesthetic Grid */}
      <section className="max-w-container-max mx-auto px-8 pb-section-padding transition-all duration-1000 opacity-0 translate-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          <div className="md:col-span-2 md:row-span-2 overflow-hidden">
            <img alt="Spa atmosphere" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" data-alt="A serene spa room bathed in natural sunlight filtering through sheer linen curtains. The interior features warm wood accents, white stone surfaces, and minimalist decor. A single treatment bed is perfectly prepared with plush white towels and a small wooden tray with aromatic herbs. The atmosphere is quiet, airy, and deeply peaceful." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOtJC3U85krHTV7_bfedsxAFFg3NWnLS3km5_Xcb42hl1mGfpmBnE73kKgOxT_7SPrJi9CRNMZTdJOOP0gLzNe-gEnfbMkoDXh2s5WoBX6EyJGuY4vqs3jyELim4-UK8VgwSIE_S6M8vni-PLyIqofbqXn-pdQnJbjYygDqJQc4DEzxEUfj3lguZ4sY0gPUQDM7-4YX4_tVl4NcY4M5j58bIQI8Ie1Q73HLrm6iWy5QnAnmUFw58DJWNVQnmfvvUDNtocoFA_AnSk" />
          </div>
          <div className="md:col-span-2 overflow-hidden">
            <img alt="Close up treatment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" data-alt="A detailed macro shot of a hand applying a golden translucent oil onto smooth skin during a therapeutic massage. The lighting catches the shimmer of the oil, highlighting its rich texture and warmth. The background is a soft blur of neutral earth tones, emphasizing the delicate and expert touch of the aesthetician." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBfx44rLLvya6pjRuv91TRtKo_ShtD8Z-CDlufVlDfFXVWiD0sC69fuA0Y_qoKJvhRpIOn7fzRcKCriVT52Jj7aeAoOXtyJJkKKbDtQMgu0zcbMyfwVhXUu0P2b4swl7_7ddNSU5b4QONlytMYiIvoVNjZoBrUuHBu2VRxAgQXupAxwAPGZ5GOz6v9Z2ncO2z2ar1vVmB1_XdPE5QoxAlpwIYP3MIRftuIIR_exMRTtKBC9KUw0k409US0Im8fClBetrKM7GW9_gs" />
          </div>
          <div className="overflow-hidden">
            <img alt="Tools of trade" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" data-alt="A curated arrangement of high-end holistic skincare tools including a jade roller, a brass incense holder with rising smoke, and small glass vials of botanical extracts. Everything is set on a matte cream-colored surface with soft shadows cast by a nearby window. The aesthetic is sophisticated, professional, and deeply grounded in wellness." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWZIlk-_DDqjFXL_2nfwCsbZrGMbmGlo-4XwwEHyZui4QiA1otarqBFPMEXO_ZxZvjycAUcItINwxU73TTexuH47__DjOZ8W93O4yfk1EICNwkVcWbFMSBkVrMJ7TtXFYI9MEZ-qPQEwB2YzvsytQcVCqU9xMP8ip_RQXVdzl1nltyyqpwcvR8XGDg8wHIV0HGSvz8sxpKPKW82P7eTRNYsko9Tbk1dwpb7A1BMrU9GIvPAWKOz0F-CEVi8DyVx3vxO36kyOIxjog" />
          </div>
          <div className="overflow-hidden">
            <img alt="Relaxation" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" data-alt="A wide-angle shot of a minimalist meditation corner within a luxury wellness space. A soft circular rug sits on a light oak floor, with a single linen floor cushion and a tall slender vase containing dried pampas grass. The walls are a warm off-white, and the entire scene is drenched in high-key, soft morning light, evoking a sense of space and clarity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAAr-AK9VmnjIS6PN4Ww88WIEw02WzbcMSiXsCsfybBsNXB4FWh8tzcbhkOwWY1_0hny6cZtKZJby11A5Laxg6dQcYO0pbO5yM11RGnmy32ccxry7EbIDpY5EwgNbRehd_zq9CJ6urfXWz1fTlD0JM0SfbT27U_TLuNlgyWYInU4ppExW5EtQNBzQbOzqxA0YAfUNbs9aKYtPn67MDn4FGlP5smFLVn4UMu0ngZDsiSeK4fWC5bIkXGu7s7BoXkLe_KRYRR4eZw1c" />
          </div>
        </div>
      </section>
    </main>
  );
}
