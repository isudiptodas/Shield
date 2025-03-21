import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // console.log(email, password );

    try{
        const present = await User.findOne({email});

        // console.log(present);

        if(!present){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, present.password);
        // console.log(isMatch);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({email: email, name: present.name, userId: present._id }, process.env.JWT_SECRET, {expiresIn: '5m'});

        return res.status(200).json({
            success: true,
            message: "Login seccessfull",
            token
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