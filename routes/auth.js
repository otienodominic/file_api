import { Router } from "express";
import {register, login, autoLogin, logout}  from '../controllers/auth.js'
import { trial } from "../controllers/files.js";

const router = Router()

// Register new User
router.post('/register', register)

// Login a user
router.post('/login', login)

// Valid cookie available
router.get('/autoLogin', autoLogin)

// Logout user
router.get('/logout', logout)

router.get('/trial', trial)


export default router