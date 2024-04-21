import mongoose from "mongoose";

export const User = mongoose.model(
    "User",
    new mongoose.Schema({
        _id: { type: String , required: true },
        username: { type: String, unique: true },
        hashed_password: {type: String, required: true},
    } as const,
    { _id: false })
);

