import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import prisma from '../config/prismaClient.js';
import { generateOTP, sendOTPEmail, validateEmail } from '../services/emailService.js';

// Login endpoint
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return res.status(400).json({ error: emailValidation.error });
    }

    const normalizedEmail = emailValidation.email;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email OTP is enabled (default 2FA method)
    if (user.emailOtpEnabled !== false) {
      // Generate OTP
      const otpCode = generateOTP();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Save OTP to database
      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpCode,
          otpExpiresAt
        }
      });

      // Send OTP email
      const emailResult = await sendOTPEmail(user.email, otpCode);
      
      if (!emailResult.success) {
        // Clear OTP if email sending failed
        await prisma.user.update({
          where: { id: user.id },
          data: {
            otpCode: null,
            otpExpiresAt: null
          }
        });
        return res.status(500).json({ error: emailResult.error || 'Failed to send OTP email' });
      }

      return res.json({ 
        status: 'otp_required', 
        email: user.email,
        message: 'OTP sent to your email address'
      });
    }

    // Check if TOTP 2FA is enabled
    if (user.twoFactorEnabled) {
      return res.json({ status: '2fa_required', email: user.email });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Generate 2FA secret and QR code
export const generate2FA = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Generate a new secret
    const secret = speakeasy.generateSecret({
      name: `Certificate Portal (${req.user.email})`,
      length: 20
    });

    // Update user with the new secret
    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret.ascii,
        twoFactorEnabled: true
      }
    });

    // Generate QR code data URL
    const dataUrl = await QRCode.toDataURL(secret.otpauth_url);

    res.json({ 
      dataUrl,
      secret: secret.ascii 
    });
  } catch (error) {
    console.error('Generate 2FA error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return res.status(400).json({ error: emailValidation.error });
    }

    const normalizedEmail = emailValidation.email;

    // Validate OTP format (must be 6 digits)
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: 'OTP must be a 6-digit number' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user || !user.otpCode || !user.otpExpiresAt) {
      return res.status(401).json({ error: 'No valid OTP found. Please request a new OTP.' });
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiresAt) {
      return res.status(401).json({ error: 'OTP has expired. Please request a new OTP.' });
    }

    // Verify the OTP
    if (user.otpCode !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    // Clear OTP from database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode: null,
        otpExpiresAt: null
      }
    });

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token: jwtToken });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return res.status(400).json({ error: emailValidation.error });
    }

    const normalizedEmail = emailValidation.email;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Generate new OTP
    const otpCode = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otpCode,
        otpExpiresAt
      }
    });

    // Send OTP email
    const emailResult = await sendOTPEmail(user.email, otpCode);
    
    if (!emailResult.success) {
      // Clear OTP if email sending failed
      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpCode: null,
          otpExpiresAt: null
        }
      });
      return res.status(500).json({ error: emailResult.error || 'Failed to send OTP email' });
    }

    res.json({ 
      message: 'OTP resent successfully'
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Verify 2FA token (TOTP)
export const verify2FA = async (req, res) => {
  try {
    const { email, token } = req.body;

    if (!email || !token) {
      return res.status(400).json({ error: 'Email and token are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.twoFactorSecret) {
      return res.status(401).json({ error: 'Invalid request' });
    }

    // Verify the token
    const isValid = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'ascii',
      token: token,
      window: 2 // Allow 2 time steps before/after current time
    });

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token: jwtToken });
  } catch (error) {
    console.error('Verify 2FA error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update admin email/password (Protected)
export const updateAdmin = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, currentPassword, newPassword } = req.body;

    // Fetch current user
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updateData = {};

    // Update email if provided
    if (email !== undefined) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        return res.status(400).json({ error: emailValidation.error });
      }
      updateData.email = emailValidation.email;
    }

    // Update password if provided
    if (newPassword !== undefined) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required' });
      }
      const ok = await bcrypt.compare(currentPassword, user.hashedPassword);
      if (!ok) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ error: 'New password must be at least 8 characters' });
      }
      updateData.hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No changes provided' });
    }

    const updated = await prisma.user.update({ where: { id: userId }, data: updateData, select: { id: true, email: true } });
    return res.json({ message: 'Account updated successfully', user: updated });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    console.error('Update admin error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

