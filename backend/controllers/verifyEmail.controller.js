import { User } from '../models/user.model.js';
import nodemailer from 'nodemailer';

export const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    console.log(email, otp);

    try{
        const found = await User.findOne({email});

        if(!found){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const transporter = nodemailer.createTransport({
            secure: true,
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user:  process.env.SHIELD_EMAIL,
                pass:  process.env.SHIELD_PASSWORD
            }
        });

        transporter.sendMail({
            to: email,
            subject: "Password Recovery",
            html: `Your otp for password recovery is : ${otp}`
        });

        return res.status(200).json({
            success: true,
            message: "User found",
        });
        // console.log(found);
    }
    catch(err){
        console.log(err.message);

        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

export const verifySecurityQuestion = async (req, res) => {
    const { email } = req.body;

    // console.log(email);

    try{
        const found = await User.findOne({email});

        if(!found){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            found
        });
        // console.log(found);
    }
    catch(err){
        console.log(err.message);

        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}
