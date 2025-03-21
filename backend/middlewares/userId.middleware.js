import jwt from 'jsonwebtoken';

export const userIdMiddleware = async (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');

    if(!token){
        return res.status(401).json({
            message: "Token missing",
            success: false
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded;
        next();
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}