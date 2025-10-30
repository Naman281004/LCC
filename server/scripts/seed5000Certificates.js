import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample data for generating realistic certificates
const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
  'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon',
  'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy',
  'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna',
  'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma',
  'Benjamin', 'Samantha', 'Samuel', 'Katherine', 'Raymond', 'Christine', 'Gregory', 'Debra',
  'Alexander', 'Rachel', 'Patrick', 'Catherine', 'Frank', 'Carolyn', 'Jack', 'Janet',
  'Dennis', 'Ruth', 'Jerry', 'Maria', 'Tyler', 'Heather', 'Aaron', 'Diane',
  'Jose', 'Virginia', 'Adam', 'Julie', 'Henry', 'Joyce', 'Nathan', 'Victoria',
  'Douglas', 'Olivia', 'Zachary', 'Kelly', 'Peter', 'Christina', 'Kyle', 'Lauren'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
  'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
  'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
  'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy',
  'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey',
  'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza',
  'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers',
  'Long', 'Ross', 'Foster', 'Jimenez', 'Powell', 'Jenkins', 'Perry', 'Russell'
];

const courses = [
  { name: 'Web Development Bootcamp', duration: '12 Weeks' },
  { name: 'Full Stack JavaScript', duration: '16 Weeks' },
  { name: 'Data Science Fundamentals', duration: '8 Weeks' },
  { name: 'Machine Learning Professional', duration: '20 Weeks' },
  { name: 'Mobile App Development', duration: '10 Weeks' },
  { name: 'Cloud Computing Essentials', duration: '6 Weeks' },
  { name: 'Cybersecurity Professional', duration: '14 Weeks' },
  { name: 'DevOps Engineering', duration: '12 Weeks' },
  { name: 'UI/UX Design Mastery', duration: '8 Weeks' },
  { name: 'Python Programming', duration: '10 Weeks' },
  { name: 'React & Redux Complete', duration: '6 Weeks' },
  { name: 'Node.js Backend Development', duration: '8 Weeks' },
  { name: 'Database Administration', duration: '10 Weeks' },
  { name: 'Artificial Intelligence', duration: '18 Weeks' },
  { name: 'Blockchain Development', duration: '12 Weeks' },
  { name: 'iOS Development with Swift', duration: '14 Weeks' },
  { name: 'Android Development with Kotlin', duration: '14 Weeks' },
  { name: 'Digital Marketing Professional', duration: '6 Weeks' },
  { name: 'Project Management PMP', duration: '8 Weeks' },
  { name: 'Agile & Scrum Master', duration: '4 Weeks' },
  { name: 'AWS Solutions Architect', duration: '10 Weeks' },
  { name: 'Azure Cloud Professional', duration: '10 Weeks' },
  { name: 'Google Cloud Platform', duration: '8 Weeks' },
  { name: 'Docker & Kubernetes', duration: '6 Weeks' },
  { name: 'Microservices Architecture', duration: '8 Weeks' },
  { name: 'GraphQL Development', duration: '4 Weeks' },
  { name: 'Vue.js Complete Guide', duration: '6 Weeks' },
  { name: 'Angular Advanced', duration: '8 Weeks' },
  { name: 'Java Enterprise Development', duration: '16 Weeks' },
  { name: 'C# .NET Development', duration: '14 Weeks' },
  { name: 'Ruby on Rails', duration: '10 Weeks' },
  { name: 'Go Programming', duration: '8 Weeks' },
  { name: 'Rust Programming', duration: '10 Weeks' },
  { name: 'Game Development with Unity', duration: '16 Weeks' },
  { name: 'Unreal Engine Development', duration: '16 Weeks' },
  { name: 'SQL & Database Design', duration: '6 Weeks' },
  { name: 'MongoDB NoSQL', duration: '4 Weeks' },
  { name: 'PostgreSQL Advanced', duration: '6 Weeks' },
  { name: 'Data Analytics with Python', duration: '10 Weeks' },
  { name: 'Business Intelligence', duration: '8 Weeks' },
  { name: 'Tableau Data Visualization', duration: '4 Weeks' },
  { name: 'Power BI Professional', duration: '6 Weeks' },
  { name: 'Excel Advanced Analytics', duration: '4 Weeks' },
  { name: 'R Programming for Data Science', duration: '8 Weeks' },
  { name: 'Deep Learning with TensorFlow', duration: '12 Weeks' },
  { name: 'Natural Language Processing', duration: '10 Weeks' },
  { name: 'Computer Vision', duration: '12 Weeks' },
  { name: 'Ethical Hacking', duration: '16 Weeks' },
  { name: 'Network Security', duration: '10 Weeks' },
  { name: 'Penetration Testing', duration: '12 Weeks' }
];

const statuses = ['VERIFIED', 'VERIFIED', 'VERIFIED', 'VERIFIED', 'UNVERIFIED']; // 80% verified

// Helper function to generate random date in the past 2 years
function randomPastDate() {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 2);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to add months to a date
function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// Generate random certificate data
function generateCertificate() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const course = courses[Math.floor(Math.random() * courses.length)];
  const issueDate = randomPastDate();
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // 70% of certificates have expiry dates (2 years after issue)
  const hasExpiry = Math.random() > 0.3;
  const expiryDate = hasExpiry ? addMonths(issueDate, 24) : null;

  return {
    studentName: `${firstName} ${lastName}`,
    courseName: course.name,
    courseDuration: course.duration,
    issueDate: issueDate,
    expiryDate: expiryDate,
    status: status
  };
}

async function seed5000Certificates() {
  console.log('\n🌱 Starting to generate 5000 certificates...\n');
  
  const startTime = Date.now();
  const batchSize = 500; // Insert in batches for better performance
  const totalCertificates = 5000;
  let totalCreated = 0;

  try {
    for (let i = 0; i < totalCertificates / batchSize; i++) {
      console.log(`📦 Generating batch ${i + 1} of ${totalCertificates / batchSize}...`);
      
      // Generate batch of certificates
      const certificates = [];
      for (let j = 0; j < batchSize; j++) {
        certificates.push(generateCertificate());
      }

      // Insert batch
      console.log(`💾 Inserting batch ${i + 1}...`);
      await prisma.certificate.createMany({
        data: certificates
      });

      totalCreated += batchSize;
      console.log(`✅ Progress: ${totalCreated}/${totalCertificates} certificates created\n`);
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('═══════════════════════════════════════════════════════');
    console.log(`🎉 SUCCESS! Created ${totalCreated} certificates in ${duration} seconds`);
    console.log('═══════════════════════════════════════════════════════\n');

    // Get some statistics
    const stats = await prisma.certificate.groupBy({
      by: ['status'],
      _count: true
    });

    console.log('📊 Certificate Statistics:');
    stats.forEach(stat => {
      console.log(`   ${stat.status}: ${stat._count} certificates`);
    });

    // Get total count
    const total = await prisma.certificate.count();
    console.log(`\n📈 Total certificates in database: ${total}`);

    // Show some sample certificate IDs for testing
    console.log('\n🔑 Sample Certificate IDs for testing:');
    const samples = await prisma.certificate.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, studentName: true, courseName: true }
    });
    
    samples.forEach(cert => {
      console.log(`   ID: ${cert.id}`);
      console.log(`   Student: ${cert.studentName}`);
      console.log(`   Course: ${cert.courseName}`);
      console.log('   ---');
    });

    console.log('\n✨ You can now search for any of these IDs in the application!\n');

  } catch (error) {
    console.error('\n❌ Error generating certificates:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seed5000Certificates();

