import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

export async function dbConnect() {
    await mongoose.connect(MONGO_URL);
} 

