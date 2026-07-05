import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("Using DATABASE_URL:", process.env.DATABASE_URL);
  try {
    const count = await prisma.review.count();
    console.log("Review count in DB:", count);
  } catch (e) {
    console.error("Error querying reviews:", e);
  }
}

main().finally(() => prisma.$disconnect());
