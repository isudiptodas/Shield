import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { name, email, password, securityQuestion, answer } = req.body;

    // console.log(name, email, password, securityQuestion, answer);
 
    try{
        const present = await User.findOne({email});

        console.log(present);
        
        if(present){
            return res.status(500).json({
                success: false,
                message: "User already exist",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, 
            email, 
            password: hashedPassword,
            securityQuestion,
            securityQuestionAnswer: answer
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User created successfull",
        });

    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }

}