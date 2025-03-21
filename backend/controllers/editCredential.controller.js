import { Credential } from '../models/credential.model.js';
import CryptoJS from 'crypto-js';

export const editCredential = async (req, res) => {
    const { newName, newUrl, newUsername, newPassword } = req.body;
    const { id } = req.params;

    const PASSWORD_SECRET = process.env.PASSWORD_SECRET;

    // console.log( newName, newUrl, newUsername, newPassword );
    // console.log(`user id is ${id}`);

    try{

        const found = await Credential.findById(id);

        let encrypted = '';

        if(newPassword !== ''){
            encrypted = CryptoJS.AES.encrypt(newPassword, PASSWORD_SECRET).toString();
        }
        else{
            encrypted = found.password;
        }

        // console.log(found);

        const updatedPassword = await Credential.findByIdAndUpdate(id, {
            websiteName: newName || found.websiteName,
            websiteURL: newUrl || found.websiteURL,
            websiteUsername: newUsername || found.websiteUsername,
            password: encrypted || found.password
        }, {new : true});

        return res.status(200).json({
            success: true,
            message: "Credential updated",
        });
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}