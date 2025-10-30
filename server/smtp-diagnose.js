import 'dotenv/config';
import nodemailer from 'nodemailer';

(async () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = String(process.env.EMAIL_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  console.log('\nSMTP Diagnose');
  console.log('Host:', host);
  console.log('Port:', port, 'Secure:', secure);
  console.log('User present:', Boolean(user));

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure,
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    tls: { rejectUnauthorized: false }
  });

  try {
    await transporter.verify();
    console.log('✔ SMTP verify OK');
  } catch (e) {
    console.error('✖ SMTP verify failed:', e.message);
    process.exit(1);
  }
})();
