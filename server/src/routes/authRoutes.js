import express from 'express';
import { login, generate2FA, verify2FA, verifyOTP, resendOTP, updateAdmin } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/2fa/verify', verify2FA);
router.post('/otp/verify', verifyOTP);
router.post('/otp/resend', resendOTP);

// Protected routes
router.post('/2fa/generate', verifyToken, generate2FA);
router.put('/admin', verifyToken, updateAdmin);

export default router;

