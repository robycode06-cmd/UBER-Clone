import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

const app = express();
//config
dotenv.config();
//middleware
app.use(cors());
//routes
app.get('/',(req,res)=>{
    res.send("hello World");
})






export default app;