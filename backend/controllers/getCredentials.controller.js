import { Credential } from '../models/credential.model.js';
import CryptoJS from 'crypto-js';

export const getCredentials = async (req, res) => {
    const userId = req.userId.userId;
    
    // console.log(userId);
    
    try{
        const found = await Credential.find({userId});

        // console.log(found);

        if(!found){
            return res.status(404).json({
                success: false,
                message: "No password found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password found",
            found
        });
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

export const decodePssword = async (req, res) => {
    const { id } = req.params;

    const SECRET_KEY = process.env.PASSWORD_SECRET;

    try{
        const found = await Credential.findById(id);

        const decrypt = CryptoJS.AES.decrypt(found.password, SECRET_KEY).toString(CryptoJS.enc.Utf8);

        return res.status(200).json({
            success: true,
            message: 'Password decoded',
            decrypt
        });
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}