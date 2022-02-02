import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()


async function main() {
  console.log('start seeding...');
  await prisma.stockMarketIndex.create({
    data: {
      code: 'IBOV',
      opensAt: '8:00',
      closesAt: '20:00'
    }
  })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    console.log('concluded seeding!')
    await prisma.$disconnect()
  })
