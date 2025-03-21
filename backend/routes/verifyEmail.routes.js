import express from 'express';
import { verifyEmail, verifySecurityQuestion } from '../controllers/verifyEmail.controller.js';

const router = express.Router();

router.post('/recover/otp', verifyEmail);
router.post('/recover/question', verifySecurityQuestion);

export default router;