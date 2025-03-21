import { userData } from '../controllers/userData.controller.js';
import { userIdMiddleware } from '../middlewares/userId.middleware.js';
import express from 'express';

const router = express.Router();

router.get('/get/data', userIdMiddleware, userData);

export default router;
