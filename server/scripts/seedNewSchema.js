import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const courses = [
  { name: 'ADCA+TALLY+COMPUTER TYPING HINDI+ENGLISH', duration: '15 Months' },
  { name: 'ADCA+TALLY+COMPUTER TYPING ENGLISH', duration: '15 Months' },
  { name: 'ADCA+TALLY+COMPUTER TYPING HINDI', duration: '15 Months' },
  { name: 'ADVANCED DIPLOMA IN COMPUTER APPLICATION (ADCA)', duration: '12 Months' },
  { name: 'DIPLOMA IN ACCOUNTING AND TAXATION', duration: '6 Months' },
  { name: 'COMPUTER TYPING COURSE HINDI+ENGLISH', duration: '6+6 Months' },
  { name: 'COMPUTER TYPING COURSE ENGLISH', duration: '6 Months' },
  { name: 'COMPUTER TYPING COURSE HINDI', duration: '6 Months' },
  { name: 'DIPLOMA IN COMPUTER APPLICATION (DCA)', duration: '6 Months' },
  { name: 'DIPLOMA IN COMPUTER APPLICATION (DCA+TALLY)', duration: '10 Months' },
  { name: 'DIPLOMA IN COMPUTER APPLICATION (DCA)+TYPING(ENGLISH+HINDI)', duration: '10 Months' },
  { name: 'DIPLOMA IN COMPUTER APPLICATION (DCA)+TYPING(ENGLISH)', duration: '10 Months' },
  { name: 'DIPLOMA IN COMPUTER APPLICATION (DCA)+TYPING(HINDI)', duration: '10 Months' }
];

const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Arjun', 'Sai', 'Aadhya', 'Ananya', 'Pari', 'Saanvi', 'Sara', 
                   'Rahul', 'Priya', 'Amit', 'Neha', 'Rajesh', 'Pooja', 'Vikram', 'Sneha', 'Ravi', 'Kavya'];
const lastNames = ['Kumar', 'Singh', 'Sharma', 'Verma', 'Gupta', 'Patel', 'Yadav', 'Reddy', 'Das', 'Jain',
                  'Mishra', 'Pandey', 'Roy', 'Sinha', 'Agarwal', 'Shah', 'Mehta', 'Nair', 'Pillai', 'Choudhary'];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRegistrationNumber(index) {
  const year = 2024;
  const paddedIndex = String(index).padStart(5, '0');
  return `LCC${year}${paddedIndex}`;
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function calculateEndDate(startDate, duration) {
  const end = new Date(startDate);
  
  if (duration.includes('3 Months')) {
    end.setMonth(end.getMonth() + 3);
  } else if (duration.includes('6 Months') && !duration.includes('6+6')) {
    end.setMonth(end.getMonth() + 6);
  } else if (duration.includes('8 Months')) {
    end.setMonth(end.getMonth() + 8);
  } else if (duration.includes('10 Months')) {
    end.setMonth(end.getMonth() + 10);
  } else if (duration.includes('12 Months') || duration.includes('6+6 Months')) {
    end.setMonth(end.getMonth() + 12);
  } else if (duration.includes('15 Months')) {
    end.setMonth(end.getMonth() + 15);
  } else {
    // For "As per syllabus" courses, assume 3-6 months
    end.setMonth(end.getMonth() + Math.floor(Math.random() * 3) + 3);
  }
  
  return end;
}

async function main() {
  console.log('🌱 Starting seed with new schema...');
  
  // Delete all existing certificates
  const deleteResult = await prisma.certificate.deleteMany({});
  console.log(`🗑️  Deleted ${deleteResult.count} existing certificates`);
  
  const certificatesToCreate = [];
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 2; // Start from 2 years ago
  
  for (let i = 1; i <= 1000; i++) {
    const course = getRandomElement(courses);
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const studentName = `${firstName} ${lastName}`;
    
    // Random start date within last 2 years
    const startDate = getRandomDate(
      new Date(startYear, 0, 1),
      new Date()
    );
    
    const endDate = calculateEndDate(startDate, course.duration);
    
    // Issue date is typically after end date
    const issueDate = new Date(endDate);
    issueDate.setDate(issueDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    // Status: 95% VERIFIED, 5% UNVERIFIED
    const status = Math.random() < 0.95 ? 'VERIFIED' : 'UNVERIFIED';
    
    certificatesToCreate.push({
      registrationNumber: generateRegistrationNumber(i),
      studentName,
      course: course.name,
      duration: course.duration,
      startDate,
      endDate,
      issueDate,
      status
    });
  }
  
  // Create all certificates
  console.log('📝 Creating 1000 certificates...');
  let created = 0;
  
  for (const cert of certificatesToCreate) {
    await prisma.certificate.create({
      data: cert
    });
    created++;
    if (created % 50 === 0) {
      console.log(`   Created ${created}/${certificatesToCreate.length} certificates...`);
    }
  }
  
  console.log('✅ Seed completed successfully!');
  console.log(`📊 Total certificates created: ${created}`);
  console.log('\n📋 Sample Certificate IDs to test:');
  
  // Get first 5 certificates to show as samples
  const samples = await prisma.certificate.findMany({
    take: 5,
    orderBy: { registrationNumber: 'asc' }
  });
  
  samples.forEach(cert => {
    console.log(`   - ID: ${cert.id}`);
    console.log(`     Reg No: ${cert.registrationNumber}`);
    console.log(`     Student: ${cert.studentName}`);
    console.log(`     Course: ${cert.course} (${cert.duration})`);
    console.log('');
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

