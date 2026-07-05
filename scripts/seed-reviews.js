import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const reviews = [
  {
    authorName: "Hernan Mamed",
    rating: 5,
    content: "Excelente atencion super profesional ! Productos de primera calidad! Sin dudarlo volveré ! Gracias Marcela"
  },
  {
    authorName: "alicia cash",
    rating: 5,
    content: "Marcela es una profesional altamente recomendable. Si piensan atenderse con alguien no duden en hacerlo con ella"
  },
  {
    authorName: "maria laura dunezat",
    rating: 5,
    content: "Me hice unos masajes relajantes , descontracturantes con Marce. Súper recomendable, además de su profesionalismo, la calidez y empatía que transmite hacen que uno la vuelva a elegir siempre💜"
  },
  {
    authorName: "Jose Luis Viglione",
    rating: 5,
    content: "Gracias Marcela, por tus manos mágicas llenas de energía y amor!!"
  },
  {
    authorName: "Ethel Mendoza",
    rating: 5,
    content: "Alo! Desde México Qro. encantada de habernos conocido, y trabajado mis registros Akashicos con vos, pronto continuaremos"
  }
];

async function main() {
  for (const r of reviews) {
    await prisma.review.create({ data: r });
    console.log(`Review importada: ${r.authorName}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
