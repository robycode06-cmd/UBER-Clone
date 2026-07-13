import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectToDB from "./db/db.js";

import userRouter from "./routes/user.routes.js";

const app = express();
//config
dotenv.config();
//mongo connection 
connectToDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRouter);
//routes
app.get('/',(req,res)=>{
    res.send("hello World");
})






export default app;