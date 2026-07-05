import { prisma } from "../lib/prisma";

const reviews = [
  { authorName: "Cami Natale", rating: 5, content: "Marce es lo más ❤️. Con ella me hago masajes y a veces trabajos energéticos, y siempre salgo renovada. Tiene una energía hermosa, transmite mucha paz y se nota el amor que le pone a lo que hace. Además, es súper profesional y atenta en cada detalle. Recomiendo un montón sus manos mágicas ✨." },
  { authorName: "Maria Jose Gauna Perg", rating: 5, content: "Excelente, la super recomiendo. El cambio en la piel que tengo desde que me atiende ella, es insuperable." },
  { authorName: "maria cristina uriarte", rating: 5, content: "Marcela ,es una excelente persona y profesional,como masajista y cosmiatra tiene mucha experiencia, yo me trato c ella hace cinco años . Y siempre se va actualizando ." },
  { authorName: "Carolina Leroux", rating: 5, content: "Excelente profesional y ser humano. Calidad, atenta y responsable en los tratamientos que realiza. Voy hace bastante tiempo, no la cambio por ningún otro lugar. Te felicito Marce 😘" },
  { authorName: "Javier Grassi", rating: 5, content: "Los MEJORES MASAJES DEL MUNDO. Marcela es increíble la energía y la técnica que tiene. Super recomendable . !!!" },
  { authorName: "Marina Zervino", rating: 5, content: "Una genia Calida, contenedora y super profesional Increíble como cambio mi piel y mi cuerpo La super recomiendo 🥰" },
  { authorName: "Renzo Scalabrino Baracco", rating: 5, content: "Marce me atendió con dedicación, comprensión, paciencia y amor que aprecio mucho y valoro, gratitud Marce! gracias de corazon, recomiendo realmente sus lecturas de Registros Akashicos" },
  { authorName: "florencia saitta", rating: 5, content: "Con Marce Mi experiencia un Mil, me abrí varias veces los registros akashicos, gracias Marce por tu dedicación, paciencia, Amor y siempre guiarme desde el amor ❤️🥰✨✨" },
  { authorName: "Stephanie F", rating: 5, content: "Mi lectura de Registros Akashicos fue increíble y Enriquecedora! Gracias Marce!" },
  { authorName: "Rosana Moyano Negocios Inmobiliarios", rating: 5, content: "Excelente experiencia con Marcela. Desde el primer momento transmite profesionalismo y calidez. El masaje fue perfecto: logró aliviar mis tensiones y dejarme con una sensación de bienestar total. Salí renovada. ¡Súper recomendable! 💆🏻‍♀️✨" },
  { authorName: "Almudena Van der Ghote", rating: 5, content: "Una experiencia espectacular! Divina amoroso y los mejores.masajes, todo i.pecable, graciasss" },
  { authorName: "Monica García", rating: 5, content: "Marcela excelente profesional. Los tratamientos que realiza muy muy recomendables !!! Un mimo al Alma !!!" },
  { authorName: "Yolanda Mielgo San Martin", rating: 5, content: "Es muy cercana y una maravillosa persona y profesional 🪷🌻✨" }
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
