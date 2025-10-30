import { PrismaClient } from '@prisma/client';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function testConnection() {
  console.log('\n🔧 PostgreSQL Connection Tester\n');
  console.log('This will help you find the correct database credentials.\n');
  
  const username = await question('Enter PostgreSQL username (default: postgres): ') || 'postgres';
  const password = await question('Enter PostgreSQL password: ');
  const database = await question('Enter database name (default: certificate_db): ') || 'certificate_db';
  const port = await question('Enter port (default: 5432): ') || '5432';
  
  const connectionString = `postgresql://${username}:${password}@localhost:${port}/${database}?schema=public`;
  
  console.log('\n🔍 Testing connection...');
  console.log(`Connection string: postgresql://${username}:****@localhost:${port}/${database}\n`);
  
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: connectionString
        }
      }
    });
    
    await prisma.$connect();
    console.log('✅ SUCCESS! Connection established!\n');
    console.log('📝 Add this to your server/.env file:\n');
    console.log(`DATABASE_URL="${connectionString}"`);
    console.log(`JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"`);
    console.log(`PORT=5000`);
    console.log('\n');
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.log('\nPlease try again with different credentials.\n');
    process.exit(1);
  }
}

testConnection();

