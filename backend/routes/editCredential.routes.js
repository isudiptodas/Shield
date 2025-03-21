import express from 'express';
import { editCredential } from '../controllers/editCredential.controller.js';

const router = express.Router();

router.put('/update/:id', editCredential);

export default router;