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


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({ msg: "User doesn't exit"})
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({ msg: "Invalid User Credintals"})

        // if (!isMatch) {
        //     return res.status(400).json({ Message: "Invalid username and password" })
        // } else {
        //     return res.status(200).json({
        //         Message: "Login Successful",
        //         user: {
        //             _id: user._id,
        //             fullname: user.firstName,
        //             email: user.email
        //         }
        //     }
        //     )
        // }

        const payload = {
            ...user
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1hr"})
        res.status(200).json({ user, token})


    } catch (error) {
        res.status(500).json({ Error: error.message})
    }
}