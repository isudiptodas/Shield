import { Credential } from '../models/credential.model.js';
import CryptoJS from 'crypto-js';

export const addPassword = async (req, res) => {
    const {  websiteName, websiteURL, password, websiteUsername } = req.body;
    const userId = req.userId.userId;

    const SECRET_KEY = process.env.PASSWORD_SECRET;
    // console.log(`user id : ${userId}`);

    try{
        const encrypted = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
        // console.log(encrypted);

        const newPassword = new Credential({
            websiteName, 
            websiteURL, 
            websiteUsername,
            password: encrypted,
            userId 
        });

        await newPassword.save();

        return res.status(200).json({
            success: true,
            message: "Credentials saved",
        });
    }
    catch(err){
        console.log(err.message);

        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
} 