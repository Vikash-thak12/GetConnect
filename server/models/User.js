import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true, 
        min: 5,
        max: 20
    },
    lastName: {
        type: String, 
        required: true, 
        min: 5,
        max: 20
    },
    email: {
        type: String, 
        required: true, 
        min: 5,
        max: 20,
        unique: true
    },
    password: {
        type: String, 
        required: true, 
        min: 5
    },
    picture: {
        type: String, 
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    location: String, 
    occupation: String,
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true})


const User = mongoose.model("User", userSchema)

export default User