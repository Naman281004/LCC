import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

console.log('📧 LCC Certificate Portal - Email Setup\n');

// Check if .env exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('EMAIL_USER') && envContent.includes('EMAIL_PASS')) {
    console.log('✅ Email configuration already present');
    console.log('\nTo update email settings:');
    console.log('1. Edit server/.env file');
    console.log('2. Update EMAIL_USER and EMAIL_PASS');
    console.log('3. Restart the server');
  } else {
    console.log('❌ Email configuration missing');
    console.log('\nPlease add to your .env file:');
    console.log('EMAIL_USER="your-email@gmail.com"');
    console.log('EMAIL_PASS="your-16-character-app-password"');
  }
} else {
  console.log('❌ .env file not found');
  console.log('\nCreating .env file...');
  
  const envContent = `# Database
DATABASE_URL="postgresql://postgres:4ChanReddit123@localhost:5432/certificate_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Port
PORT=5000

# Email Configuration (Gmail)
# Get your app password from: https://myaccount.google.com/apppasswords
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-16-character-app-password"
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('\nNext steps:');
    console.log('1. Edit server/.env file');
    console.log('2. Replace EMAIL_USER with your Gmail address');
    console.log('3. Replace EMAIL_PASS with your Gmail app password');
    console.log('4. Restart the server');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
  }
}

console.log('\n📋 Gmail App Password Setup:');
console.log('1. Go to: https://myaccount.google.com/apppasswords');
console.log('2. Select "Mail" and "Other (Custom name)"');
console.log('3. Enter "LCC Certificate Portal"');
console.log('4. Copy the 16-character password');
console.log('5. Use it as EMAIL_PASS in .env file');
