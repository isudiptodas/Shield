import mongoose from 'mongoose';

const credentialModel = mongoose.Schema({
    websiteName: {type: String, required: true},
    websiteURL: {type: String, required: true},
    websiteUsername: {type: String, required: false},
    password: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

export const Credential = mongoose.model("Credential", credentialModel);