const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$queryRaw `SELECT 1`;
    console.log('Prisma - Database connected');
  } catch (error) {
    console.error('Prisma - Database connection failure: ', error)
  }
})();

module.exports = prisma;
