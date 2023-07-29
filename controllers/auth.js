import User from '../models/users.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createError } from '../utils/error.js'
dotenv.config()

// Register a user
export const register = async (req, res, next) => {    
    try {
        const {name, email, password, isAdmin} = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashed_password = bcrypt.hashSync(password,salt)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashed_password,
            isAdmin: req.body.isAdmin
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
// Login a user
export const login = async (req, res, next) => {    
    try {  
        const user = await User.findOne({email:req.body.email})        
        if(!user) return next(createError(404, "User not found!"))    
        const correctPass = await bcrypt.compare(req.body.password, user.password)
        if(!correctPass) return next(createError(400, "Email or Password is incorrect!"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRECY_KEY)
        

        const {password, ...otherDetails} = user._doc        

        res.cookie("access_token", token, { httpOnly: true}).status(200)
        res.json(otherDetails)
        
        // const token = jwt.sign({id:user._id, email: user.isAdmin}, process.env.SECRET_KEY)        
        // const {...otherDetails} = user
        // res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails._doc})
        
    } catch (err) {
        next(err)
    }
}

// Auto Login

export const autoLogin = async(req, res, next) => {
    const cookie = req.headers.cookie
    if (!cookie || cookie === null){
        return res.status(401)
    }
    res.status(200)
}

// Logout path

export const logout = async(req, res, next) => {
    res.clearCookie('access_token')
    return res.status(200).json('Logged out!')
}