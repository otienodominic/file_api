import { Router } from "express";
import {register, login, autoLogin, logout}  from '../controllers/auth.js'

const router = Router()

// Register new User
router.post('/register', register)

// Login a user
router.post('/login', login)

// Valid cookie available
router.get('/autoLogin', autoLogin)

// Logout user
router.get('/logout', logout)


export default router