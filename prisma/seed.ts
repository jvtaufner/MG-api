import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.user.create({
    data: {
      email: 'foo@email.com',
      password: 'foobarfizz',
      name: 'foo',
    },
  });

  await prisma.user.create({
    data: {
      email: 'bar@email.com',
      password: 'foobarfizz',
      name: 'bar',
    },
  });

  await prisma.user.create({
    data: {
      email: 'fizzr@email.com',
      password: 'foobarfizz',
      name: 'fizz',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
