import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    displayName: String,
    photoURL: String,
    uid: String
})

export const UserModel = mongoose.model("User", UserSchema)

