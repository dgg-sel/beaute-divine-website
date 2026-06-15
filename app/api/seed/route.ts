import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('key') !== 'divine') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rootFolder = process.env.CLOUDINARY_ROOT_FOLDER;
    const catalogFolder = process.env.CLOUDINARY_CATALOG_FOLDER;

    if (!rootFolder || !catalogFolder) {
      return NextResponse.json({ error: "Faltan variables de entorno de Cloudinary" }, { status: 500 });
    }
    
    const folder = `${rootFolder}/${catalogFolder}`;
    
    // 1. Limpiar base de datos
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    
    // 2. Crear categorías
    const cat1 = await prisma.category.create({ data: { name: 'Cremas faciales' } });
    const cat2 = await prisma.category.create({ data: { name: 'Serums faciales' } });
    const cat3 = await prisma.category.create({ data: { name: 'Mascarillas faciales' } });
    const cat4 = await prisma.category.create({ data: { name: 'Tarjetas de Regalo' } });

    // 3. Buscar fotos en Cloudinary
    // Buscamos recursos dentro del folder especificado
    let allResources: any[] = [];
    let nextCursor = null;

    do {
      const result: any = await cloudinary.search
        .expression(`folder:${folder}/*`)
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();

      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    // 4. Crear productos en la base de datos
    const createdProducts = [];
    for (const resource of allResources) {
      // Guardamos el public_id como acordado en la nueva arquitectura
      const imageUrl = resource.public_id;
      
      const p = await prisma.product.create({
        data: {
          title: 'Producto Importado',
          description: 'Este producto fue importado automáticamente de Cloudinary. Edítalo en el administrador.',
          categoryId: cat1.id, // Por defecto todo a Cremas faciales
          image: imageUrl,
          price: 0,
          stock: 10,
          tag: 'Consultar'
        }
      });
      createdProducts.push(p);
    }

    return NextResponse.json({
      message: 'Base de datos poblada exitosamente',
      categoriesCount: 4,
      productsImported: createdProducts.length,
      resources: allResources.map(r => r.public_id)
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
