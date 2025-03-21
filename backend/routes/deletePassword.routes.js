import express from 'express';
import { deletePassword } from '../controllers/deletePassword.controller.js';

const router = express.Router();

router.delete('/delete/:id', deletePassword);

export default router;