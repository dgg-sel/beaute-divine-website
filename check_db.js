const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_LHg3Ru0EnkDf@ep-super-king-aconlrpa-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
});

async function main() {
  const products = await prisma.product.findMany({
    select: { title: true, stock: true }
  });
  console.log("PRODUCTS:");
  console.table(products);

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { items: true }
  });
  console.log("LATEST ORDERS:");
  orders.forEach(o => {
    console.log(`Order ${o.id} - Status: ${o.status} - Created: ${o.createdAt}`);
    o.items.forEach(i => console.log(`  Item: ${i.productId} Qty: ${i.quantity}`));
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
