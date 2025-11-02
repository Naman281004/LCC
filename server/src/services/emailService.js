import nodemailer from 'nodemailer';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate email format
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }
  
  return { valid: true, email: trimmedEmail };
};

// Create transporter for sending emails
const createTransporter = () => {
  // Allow custom SMTP via env, fallback to Gmail 587 STARTTLS
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = String(process.env.EMAIL_SECURE || 'false').toLowerCase() === 'true';

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465, false for 587/25
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    requireTLS: !secure, // force STARTTLS when not using implicit TLS
    connectionTimeout: 15000, // 15s
    greetingTimeout: 10000,   // 10s
    socketTimeout: 20000,     // 20s
    tls: {
      // In dev networks, some proxies can break cert chain; keep permissive to avoid false negatives
      rejectUnauthorized: false
    }
  });
};

// Generate 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otpCode) => {
  try {
    // Validate email format
    const validation = validateEmail(email);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    
    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email configuration missing. OTP for testing:', otpCode);
      return { success: true, messageId: 'test-mode', testMode: true };
    }
    
    const transporter = createTransporter();
    
    // Test connection first – do not silently fall back; return explicit error
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP connection failed:', verifyError);
      return { success: false, error: `SMTP verify failed: ${verifyError.message}` };
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: validation.email,
      subject: 'LCC Sahibganj - Admin Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #132440 0%, #16476A 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">LCC Computer Center</h1>
            <p style="color: #BF092F; margin: 10px 0 0 0; font-size: 16px;">Certificate Verification Portal</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #132440; margin-bottom: 20px;">Admin Login Verification</h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              You have requested to login to the LCC Computer Center Admin Dashboard. 
              Please use the following One-Time Password (OTP) to complete your login:
            </p>
            
            <div style="background: white; border: 2px solid #3B9797; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #6B7280;">Your OTP Code:</p>
              <h1 style="margin: 10px 0; font-size: 36px; color: #132440; letter-spacing: 5px; font-family: monospace;">${otpCode}</h1>
            </div>
            
            <p style="color: #6B7280; font-size: 14px; margin-bottom: 10px;">
              <strong>Important:</strong>
            </p>
            <ul style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>This OTP is valid for 10 minutes only</li>
              <li>Do not share this code with anyone</li>
              <li>If you didn't request this login, please ignore this email</li>
            </ul>
          </div>
          
          <div style="background: #132440; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0; font-size: 14px;">
              © 2024 LCC Computer Center, Sahibganj | JN Roy Road, Sahibganj - 816109 (Jharkhand) India
            </p>
            <p style="color: #3B9797; margin: 5px 0 0 0; font-size: 12px;">
              Contact: +91 6436222820 | lcccomputer@sahibganj.edu
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('OTP Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};
