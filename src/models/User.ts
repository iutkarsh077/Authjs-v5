import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    }
}, {timestamps: true})

const Auth = mongoose.models?.NextAuth || mongoose.model("NextAuth", userSchema);
export default Auth;