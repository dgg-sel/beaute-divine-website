import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const reviews = [
  { authorName: "Gime Lima Jofre", rating: 5, content: "Super recomiendo! No solo los tratamientos estéticos que son increíbles sino la execelente atención de Marcela. Espectacular!" },
  { authorName: "Liliana Jorge", rating: 5, content: "Excelente profesional y excelente su atención.. Muy buena mano para los masajes..." },
  { authorName: "Juanitas Bres", rating: 5, content: "Excelente el servicio !!! Quedé muy contenta !!! Y muy cálida marcela !!! Un placer !!" },
  { authorName: "Ines Elisabet Boltiansky", rating: 5, content: "Excelente servicio Marcela. Muy atenta . Recomiendo 👍" },
  { authorName: "Estrella Saker", rating: 5, content: "Excelente Marcela ,muy profesional !! Súper recomendable !" },
  { authorName: "Luz", rating: 5, content: "Amorosa Marcela! Recomiendo muchísimo sus servicios. Hace un tiempo ya me atiendo con ella, un 10" },
  { authorName: "Rodrigo Ada", rating: 5, content: "Increíble masajista. Me fui en las nubes. Lo recomiendo 100%" },
  { authorName: "Magali Arenas", rating: 5, content: "Amorosa su atención 🙌 súper recomendable" },
  { authorName: "Gaby Venturuzzi", rating: 5, content: "Excelente profesional, muy recomendable , un ambiente muy tranquilo, para relajar." },
  { authorName: "Mariana Delía", rating: 5, content: "Super re omendable. Todo impecable, excelentes masajes, super relajantes.  Gracias." },
  { authorName: "Vivi Medina", rating: 5, content: "Marcela, siempre excelente atencion. Todo super !! La recomiendo 100%" },
  { authorName: "Andrea Laniado", rating: 5, content: "Una grosa Marce! Dedicada y atenta al maximo" },
  { authorName: "Lorena Padial", rating: 5, content: "Excelente profesional!! Amo los masajes ! ❤️" },
  { authorName: "Luciana Rossi", rating: 5, content: "Espectacular los masajes de Marcela!!" },
  { authorName: "Belkis Pioja", rating: 5, content: "Excelente  profesional!! Su atención. Gracias Marce ❤️" },
  { authorName: "Gustavo Geier", rating: 5, content: "Excelente y muy recomendable los masajes!" },
  { authorName: "Silvia artaza", rating: 5, content: "Excelente !!! Me encantó el lugar . Ella una genia y muy profesional ." },
  { authorName: "Ornella Pirraglia", rating: 5, content: "Exelente!!! Genia marce 🙌🏾💖" },
  { authorName: "Deborah Müller", rating: 5, content: "Excelente atención y resultados!!!! Impecable todo 😍" },
  { authorName: "veronica veris", rating: 5, content: "Excelente profesional, te vas renovada. Muy recomendable 💯" },
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

export async function GET() {
  try {
    const existing = await prisma.review.count();
    let seeded = 0;
    for (const r of reviews) {
      const exists = await prisma.review.findFirst({ where: { authorName: r.authorName } });
      if (!exists) {
        await prisma.review.create({
          data: {
            authorName: r.authorName,
            content: r.content,
            rating: r.rating,
            isActive: true,
          }
        });
        seeded++;
      }
    }
    return NextResponse.json({ success: true, message: `Seeded ${seeded} reviews. Total reviews now: ${existing + seeded}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
