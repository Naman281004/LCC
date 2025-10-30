import express from 'express';
import {
  getCertificateById,
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - anyone can verify a certificate
router.get('/:id', getCertificateById);

// Protected admin routes
router.get('/', verifyToken, getAllCertificates);
router.post('/', verifyToken, createCertificate);
router.put('/:id', verifyToken, updateCertificate);
router.delete('/:id', verifyToken, deleteCertificate);

export default router;

