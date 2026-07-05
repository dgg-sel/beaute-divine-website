import { prisma } from "../lib/prisma";

async function main() {
  const reviews = await prisma.review.findMany({ select: { id: true, authorName: true } });
  console.log(JSON.stringify(reviews, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
