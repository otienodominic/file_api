import User from "../models/users.js"
import {createError} from '../utils/error.js'


export const getUsers = async (req, res, next)=> {
    
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }    
}

export const editUser = async (req, res, next)=> {
    try {
        const user = req.body
        const edited_user = await User.findByIdAndUpdate(req.params.id,user)
        res.status(201).json(edited_user)
    } catch (err) {        
        next(err)        
    }
}

export const createUser = async(req, res, next) => {     
    try {
        const user = req.body
        const new_user = new User({...user})  
        let us = await new_user.save()
        res.status(200).json(us)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async(req, res, next)=> {
    try {
        let user_id = req.params.id
        await User.findByIdAndDelete(user_id)
        res.status(200).json(user_id)

    } catch (err) {
        next(err)
    }
}

export const  getUser = async(req, res, next) => {
    try {
        let user_id = req.params.id
        let user = await User.findById(user_id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

