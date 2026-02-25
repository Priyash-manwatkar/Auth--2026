import express from 'express'
import dbConnection from './db.js'
import userRouter from './routes/User.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from "cors";
const app=express();
dotenv.config();
app.use(express.json())
app.use(cookieParser())
const port=8080;
dbConnection()


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use('/api/user',userRouter)
app.listen(port,()=>{
    console.log("server is listening");
})
