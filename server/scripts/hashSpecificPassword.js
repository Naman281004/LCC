import bcrypt from 'bcryptjs';

const password = '4ChanReddit123';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  
  console.log('\n🔐 Password Hash Generated!\n');
  console.log('Password:', password);
  console.log('Hashed:', hash);
  console.log('\n📝 Copy this SQL and run in pgAdmin:\n');
  console.log(`INSERT INTO "User" (id, email, "hashedPassword", "twoFactorEnabled")`);
  console.log(`VALUES (`);
  console.log(`  'admin001',`);
  console.log(`  'naan11477@gmail.com',`);
  console.log(`  '${hash}',`);
  console.log(`  false`);
  console.log(`);\n`);
  
  process.exit(0);
});

