import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Updating course names in the database...');

  const res1 = await prisma.certificate.updateMany({
    where: { course: 'DIPLOMA IN FINANCIAL ACCOUNTING--TALLY (DFA)' },
    data: { course: 'DIPLOMA IN ACCOUNTING AND TAXATION' }
  });
  console.log(`Updated ${res1.count} DFA certificates.`);
  
  const res1b = await prisma.certificate.updateMany({
    where: { course: 'Diploma in Accounting and Taxation (DFA)' },
    data: { course: 'DIPLOMA IN ACCOUNTING AND TAXATION' }
  });
  console.log(`Updated ${res1b.count} alternative DFA certificates.`);

  const res1c = await prisma.certificate.updateMany({
    where: { course: 'DFA' },
    data: { course: 'DIPLOMA IN ACCOUNTING AND TAXATION' }
  });
  console.log(`Updated ${res1c.count} old DFA certificates.`);

  const res2 = await prisma.certificate.updateMany({
    where: { course: 'ENGLISH TYPING COURSE' },
    data: { course: 'COMPUTER TYPING COURSE ENGLISH' }
  });
  console.log(`Updated ${res2.count} English Typing certificates.`);

  const res3 = await prisma.certificate.updateMany({
    where: { course: 'HINDI TYPING COURSE' },
    data: { course: 'COMPUTER TYPING COURSE HINDI' }
  });
  console.log(`Updated ${res3.count} Hindi Typing certificates.`);
  
  const res2b = await prisma.certificate.updateMany({
    where: { course: 'English Typing' },
    data: { course: 'COMPUTER TYPING COURSE ENGLISH' }
  });
  console.log(`Updated ${res2b.count} alternative English Typing certificates.`);

  const res3b = await prisma.certificate.updateMany({
    where: { course: 'Hindi Typing' },
    data: { course: 'COMPUTER TYPING COURSE HINDI' }
  });
  console.log(`Updated ${res3b.count} alternative Hindi Typing certificates.`);

  console.log('Database update complete.');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
