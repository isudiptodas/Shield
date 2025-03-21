import { User } from '../models/user.model.js';

export const userData = async (req, res) => {

    const userId = req.userId.userId;
    // console.log(userId);

    try{
        const found = await User.findById(userId);
        // console.log(found);

        if(!found){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            found
        });
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}