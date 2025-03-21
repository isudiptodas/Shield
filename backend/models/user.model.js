import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    securityQuestion: {type: String, required: true},
    securityQuestionAnswer: {type: String, required: true},
}, {timestamps: true});

export const User = mongoose.model("User", userModel);