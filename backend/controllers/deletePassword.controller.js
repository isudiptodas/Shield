import { Credential } from '../models/credential.model.js';

export const deletePassword = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedPassword = await Credential.findByIdAndDelete(id);

        if(deletedPassword){
            return res.status(200).json({
                success: true,
                message: "Credential deleted",
            });
        }

        return res.status(404).json({
            success: false,
            message: "Credential not found",
        });

    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}