"use server";
import mongoose from "mongoose";

export default async function dbConnect(){
    try {
        const connectMe = await mongoose.connect(process.env.DB_URI!);
        console.log("Database connected successfully");
    } catch (error) {
        throw new Error("database connection failed");
    }
}