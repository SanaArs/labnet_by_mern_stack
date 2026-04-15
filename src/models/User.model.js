import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "first name is required"],
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "gender is required"]
    },
    date_of_birth: {
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, "address is required"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Contact no is required"],
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "user", "lab"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
export default User;