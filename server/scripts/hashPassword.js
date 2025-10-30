import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function hashPassword() {
  try {
    console.log('\n=== Password Hasher ===\n');
    
    const password = await question('Enter password to hash: ');
    
    if (!password) {
      console.error('❌ Password is required!');
      process.exit(1);
    }
    
    console.log('\n🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('\n✅ Password hashed successfully!\n');
    console.log('Hashed password:');
    console.log(hashedPassword);
    console.log('\nUse this hash in your database INSERT statement.\n');
    
  } catch (error) {
    console.error('❌ Error hashing password:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

hashPassword();

