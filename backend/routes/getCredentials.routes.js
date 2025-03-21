import express from 'express';
import { getCredentials, decodePssword } from '../controllers/getCredentials.controller.js';
import { userIdMiddleware } from '../middlewares/userId.middleware.js';

const router = express.Router();

router.get('/get/passwords', userIdMiddleware, getCredentials);
router.get('/password/:id', decodePssword);

export default router;