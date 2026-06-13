const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with categories and products...");
  
  // Create Categories
  const cat1 = await prisma.category.upsert({ where: { name: 'Cremas faciales' }, update: {}, create: { name: 'Cremas faciales' } });
  const cat2 = await prisma.category.upsert({ where: { name: 'Serums faciales' }, update: {}, create: { name: 'Serums faciales' } });
  const cat3 = await prisma.category.upsert({ where: { name: 'Mascarillas faciales' }, update: {}, create: { name: 'Mascarillas faciales' } });
  const cat4 = await prisma.category.upsert({ where: { name: 'Tarjetas de Regalo' }, update: {}, create: { name: 'Tarjetas de Regalo' } });

  for (let i = 1; i <= 33; i++) {
    await prisma.product.create({
      data: {
        title: `Producto de Prueba ${i}`,
        description: `Esta es la descripción del producto ${i}. Cárgalo correctamente desde el administrador.`,
        categoryId: cat1.id,
        image: `foto-${i}.jpg`,
        price: 15000,
        stock: 10,
        tag: 'Consultar'
      }
    });
  }

  // Tarjeta de regalo especial
  await prisma.product.create({
    data: {
      title: 'Gift Card Exclusiva',
      description: 'Regalá una experiencia Beauté Divine o el valor equivalente en nuestros productos premium.',
      categoryId: cat4.id,
      image: 'giftcard.jpg',
      price: 0,
      stock: 999,
      tag: 'Personalizable'
    }
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
