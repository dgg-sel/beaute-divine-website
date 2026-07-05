import { prisma } from "../lib/prisma";

const reviews = [
  { authorName: "Gime Lima Jofre", rating: 5, content: "Super recomiendo! No solo los tratamientos estéticos que son increíbles sino la execelente atención de Marcela. Espectacular!" },
  { authorName: "Liliana Jorge", rating: 5, content: "Excelente profesional en todo servicio que ofrece a la comunidad. Sería y responsable. Recomiendo 100%" },
  { authorName: "Juanitas Bres", rating: 5, content: "Marcela es la mejor!, su excelencia en los tratamientos y su cuidado hacia cada una de las que nos hacemos sus tratamientos es increíble! Más que recomendable una excelente profesional" },
  { authorName: "Ines Elisabet Boltiansky", rating: 5, content: "Excelente atención !!!! Marce es un amor de persona y te deja una diosa! Súper recomendable! 👌" },
  { authorName: "Estrella Saker", rating: 5, content: "Excelente servicios!!! Lo volvería mil veces!!! La mejor Marcela tiene una energía sanadora en sus manos!!! Cada vez que he ido salgo recargada dw energía positiva!!! Me encantaa!" },
  { authorName: "Luz", rating: 5, content: "Los masajes son muy relajantes y placenteros. Además de Marce que tiene mucha dulzura y cuidado 💗" },
  { authorName: "Rodrigo Ada", rating: 5, content: "Un lujo el servicio marcela , excelente trabajo , ambiente y buena onda.. %100 recomendable .. voy a volver muchas veces porque es un regalo al cuerpo con una excelente atención 💗❣️" },
  { authorName: "Magali Arenas", rating: 5, content: "Marce es un amor, siempre te recibe con mucha calidez y hacerme masajes con ella es una gran mimo que me hago! 💕" },
  { authorName: "Gaby Venturuzzi", rating: 5, content: "Fantástica Marcela, molto profesional." },
  { authorName: "Mariana Delía", rating: 5, content: "Impecable. Es un lujo atenderse con Marcela, un regalo al cuerpo y al alma. Es super profesional, muy amorosa y usa productos excelentes. 200% recomendada" },
  { authorName: "Vivi Medina", rating: 5, content: "Excelente. Profesional ,la recomiendo! Es mágica!!! Entras doblada y salis para maratón! Gracias Marcela ,sos más que recomendable! Te felicito! Esas manitos que Dios te dió! Que siempre te acompañen! Sos lo más!" },
  { authorName: "Andrea Laniado", rating: 5, content: "Gracias por ayudarme con tus hermosas y variadas terapias.🌸 Es un placer recibir tus masajes.🙌 Me encanta como queda mi rostro después de tu limpieza de cutis.✨ Agradezco la evolución que veo en mi luego de una terapia de thetahealing 💜🌺 gracias gracias gracias 🫂" },
  { authorName: "Lorena Padial", rating: 5, content: "Recomiendo a este ser hermoso que te embellece no solo el cuerpo sino tambien el alma 💗" },
  { authorName: "Luciana Rossi", rating: 5, content: "Sus masajes son de otro planeta!! Solo eso. gracias Marce 🪽✨" },
  { authorName: "Belkis Pioja", rating: 5, content: "Increíble los masajes y la limpieza de cutis. Volví renovada. Excelente atención! Muy recomendable" },
  { authorName: "Gustavo Geier", rating: 5, content: "Increíble profesionalismo y efectividad.. Tuve diversas experiencias en masajes terapéuticos y sin lugar a dudas ésta fue la mejor." },
  { authorName: "Silvia artaza", rating: 5, content: "Excelente atención y servicio, con productos de calidad, pero por sobre todo, el amor y delicadeza con que atiende Marce, es superior, imposible sentirte incomoda, tanto el ambiente y el trato hacen que te entregues por completo a todos los tratamientos que ofrece. Gracias, gracias, gracias 🙂 🙏" },
  { authorName: "Ornella Pirraglia", rating: 5, content: "Súper recomendable. Hermosa 😍 atención de Marcela. Me hice varias cosas y me están dando muchos resultados" },
  { authorName: "Deborah Müller", rating: 5, content: "Tuve la oportunidad de tomar tres sesiones de masajes con Marce (descontracturantes y relajantes). Ella transmite mucha calidez y profesionalismo. Los masajes me parecieron muy completos. Sin dudas la recomiendo, porque transmite cuidado y bienestar. 🤍" },
  { authorName: "veronica veris", rating: 5, content: "Excelente atención! Las mejores manos...la tranquilidad que te genera su voz...es un mimo al alma atenderme con ella. Una profesional como pocas ...GRACIASSSS" }
];

async function main() {
  console.log("Seeding", reviews.length, "reviews...");
  for (const r of reviews) {
    await prisma.review.create({
      data: {
        authorName: r.authorName,
        content: r.content,
        rating: r.rating,
        isActive: true,
      }
    });
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
