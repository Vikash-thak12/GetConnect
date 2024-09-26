import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import User from "../models/User.js"


export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picture,
            location, 
            occupation, 
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordhash,
            picture,
            location, 
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ Error: error.message})
    }
}


export const login = async () => {
    
}