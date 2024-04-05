import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

export const db = async function dbConnect() {
    await mongoose.connect(MONGO_URL);
}
