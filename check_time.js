const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_LHg3Ru0EnkDf@ep-super-king-aconlrpa-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
  }
});

async function main() {
  const dbNow = await prisma.$queryRaw`SELECT now() as db_time`;
  console.log("DB Time:", dbNow);
  console.log("Server Time:", new Date());
}
main().finally(() => prisma.$disconnect());
