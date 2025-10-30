import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleCertificates = [
  {
    studentName: 'John Doe',
    courseName: 'Web Development Bootcamp',
    courseDuration: '12 Weeks',
    issueDate: new Date('2024-01-15'),
    expiryDate: new Date('2026-01-15'),
    status: 'VERIFIED'
  },
  {
    studentName: 'Jane Smith',
    courseName: 'Data Science Fundamentals',
    courseDuration: '8 Weeks',
    issueDate: new Date('2024-02-20'),
    expiryDate: null,
    status: 'VERIFIED'
  },
  {
    studentName: 'Bob Johnson',
    courseName: 'Mobile App Development',
    courseDuration: '10 Weeks',
    issueDate: new Date('2024-03-10'),
    expiryDate: new Date('2026-03-10'),
    status: 'VERIFIED'
  },
  {
    studentName: 'Alice Williams',
    courseName: 'Cloud Computing Essentials',
    courseDuration: '6 Weeks',
    issueDate: new Date('2024-04-05'),
    expiryDate: null,
    status: 'VERIFIED'
  },
  {
    studentName: 'Charlie Brown',
    courseName: 'Cybersecurity Professional',
    courseDuration: '16 Weeks',
    issueDate: new Date('2024-05-01'),
    expiryDate: new Date('2027-05-01'),
    status: 'VERIFIED'
  }
];

async function seedCertificates() {
  try {
    console.log('\n🌱 Seeding sample certificates...\n');
    
    for (const cert of sampleCertificates) {
      const created = await prisma.certificate.create({
        data: cert
      });
      console.log(`✅ Created certificate for ${created.studentName} (ID: ${created.id})`);
    }
    
    console.log(`\n✅ Successfully seeded ${sampleCertificates.length} certificates!\n`);
    
  } catch (error) {
    console.error('❌ Error seeding certificates:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedCertificates();

