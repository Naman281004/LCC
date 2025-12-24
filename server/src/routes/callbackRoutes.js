import express from 'express';
import { submitCallback } from '../controllers/callbackController.js';

const router = express.Router();

// POST /api/callback - Submit callback request
router.post('/', submitCallback);

export default router;
