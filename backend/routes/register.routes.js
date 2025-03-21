import express from 'express';
import { registerUser } from '../controllers/register.controller.js';

const router = express.Router();

router.post('/auth/register', registerUser);

export default router;