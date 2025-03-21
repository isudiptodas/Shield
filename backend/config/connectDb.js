import mongoose from 'mongoose';

export const connectDb = async () => {

    const MONGO_DB_URL = process.env.MONDO_DB_URL;

    try{
        await mongoose.connect(MONGO_DB_URL);
        console.log("Database connected");
    }
    catch(err){
        console.log(err.message);
    }
}