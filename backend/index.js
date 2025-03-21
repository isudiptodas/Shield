import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDb } from './config/connectDb.js';
import registerUser from './routes/register.routes.js';
import loginUser from './routes/login.routes.js';
import addPassword from './routes/addPassword.routes.js';
import getCredentials from './routes/getCredentials.routes.js';
import editCredentials from './routes/editCredential.routes.js';
import deleteCredential from './routes/deletePassword.routes.js';
import verifyEmail from './routes/verifyEmail.routes.js';
import updatePassword from './routes/updatePassword.routes.js';
import userdata from './routes/userData.routes.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'https://shield-1-w26n.onrender.com',
}));

const port = process.env.PORT;

connectDb();

app.listen(port, () => {
    console.log("Server started");
});

app.use(registerUser);
app.use(loginUser);
app.use(addPassword);
app.use(getCredentials);
app.use(editCredentials);
app.use(deleteCredential);
app.use(verifyEmail);
app.use(updatePassword);
app.use(userdata);
