import { Router } from "express";
import {getUsers, editUser, createUser, deleteUser, getUser} from '../controllers/users.js'
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";



const router = Router()

router.get('/', verifyAdmin,getUsers)

router.put('/edit/:id', verifyUser, editUser)

// router.post('/create', ,createUser)

router.delete('/delete/:id', verifyUser, deleteUser)
router.get("/:id", verifyUser, getUser)


// router.get('/authenticate', verifyToken, (req, res, next) => {
//     res.json({message: "Hello you are Authenticated!"})
// })

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.json({message: "Hello user you are free to rumble!!"})
// })
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.json({message: "Hello Admin you are free to delete any account you deem fit!!"})
// })

export default router