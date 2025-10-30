import 'dotenv/config';
import fs from 'fs';
import path from 'path';

console.log('📧 Setting up Brevo SMTP (Free Alternative to Gmail)\n');

console.log('Step 1: Create a free Brevo account');
console.log('1. Go to: https://www.brevo.com/');
console.log('2. Sign up for a free account');
console.log('3. Verify your email address');
console.log('4. Go to Settings → SMTP & API');
console.log('5. Copy your SMTP API Key\n');

console.log('Step 2: Update your .env file');
console.log('Add these lines to server/.env:\n');

const envContent = `# Database
DATABASE_URL="postgresql://postgres:4ChanReddit123@localhost:5432/certificate_db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Port
PORT=5000

# Email Configuration (Brevo SMTP - More reliable than Gmail)
EMAIL_HOST="smtp-relay.brevo.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="apikey"
EMAIL_PASS="YOUR_BREVO_API_KEY_HERE"
`;

console.log(envContent);

console.log('\nStep 3: Test the configuration');
console.log('After updating .env, run: node smtp-diagnose.js');
console.log('You should see: "✔ SMTP verify OK"');

console.log('\nStep 4: Restart the server');
console.log('npm run dev');

console.log('\nWhy Brevo?');
console.log('- More reliable than Gmail SMTP');
console.log('- Works on most networks');
console.log('- Free tier: 300 emails/day');
console.log('- No app password needed');
console.log('- Professional email delivery');
