import express from 'express';
import { addPassword } from '../controllers/addPassword.controller.js';
import { userIdMiddleware } from '../middlewares/userId.middleware.js';

const router = express.Router();

router.post('/add-password', userIdMiddleware, addPassword);

export default router;