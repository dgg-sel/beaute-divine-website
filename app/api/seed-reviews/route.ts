import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

  try {
    const count = await prisma.review.count();
    if (count === 0) {
      for (const r of reviews) {
        await prisma.review.create({ data: r });
      }
      return NextResponse.json({ success: true, message: "5 reviews seeded." });
    }
    return NextResponse.json({ success: true, message: "Reviews already exist." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
