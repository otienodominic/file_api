import express from 'express'

const router = express.Router()

router.get('/domi', (req, res)=>{
    res.cookie('linda', 'How come you have a cookie?', { httpOnly: true})
    // res.clearCookie('access')
    res.json({
        name: "Ayicho",
        age: 23,
        sex: "Female"
    })
})

export default router