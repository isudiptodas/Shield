import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const updatePassword = async (req, res) => {

    // console.log(req.body);
    const { password, email } = req.body;

    // console.log(password, email);

    try {
        const present = await User.findOne({ email });

        // console.log(present);

        if (!present) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        present.password = hashedPassword;

        await present.save();

        return res.status(200).json({
            success: true,
            message: "Login successfull",
        });

    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }

}