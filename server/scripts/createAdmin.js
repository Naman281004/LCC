import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    console.log('\n=== Create Admin User ===\n');
    
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');
    
    if (!email || !password) {
      console.error('❌ Email and password are required!');
      process.exit(1);
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.error(`❌ User with email ${email} already exists!`);
      process.exit(1);
    }
    
    // Hash password
    console.log('\n🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    console.log('📝 Creating admin user...');
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        twoFactorEnabled: false,
      },
    });
    
    console.log('\n✅ Admin user created successfully!');
    console.log(`📧 Email: ${user.email}`);
    console.log(`🆔 ID: ${user.id}`);
    console.log('\n🔑 You can now login with these credentials.\n');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

createAdmin();

