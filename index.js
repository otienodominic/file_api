import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import filesRoute from "./routes/files.js"
import userRoute from "./routes/users.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

import freeApi from "./routes/freeApi.js"

const app  = express()
dotenv.config()


// Database Connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("connected to mongodb Successfully")
      } catch (error) {
        throw error;
      }
}

// Middleware here!
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/auth',authRoute)
app.use('/api/files',filesRoute)
app.use('/api/users', userRoute)
app.use('/api/free', freeApi)



// Error handling middleware
app.use((err, req, res, next) => {
   const errorStatus = err.status || 500
   const errorMessage = err.message || "Kuna jambo lililo Baya kweli!"
   return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
   })
})




const port = process.env.PORT || 8000
// if (port == null || port == "") {
//   port = 8000;
// }
app.listen(port, ()=> {
    connect()
    console.log(`Listening to port number ${port}`)
})