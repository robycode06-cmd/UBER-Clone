import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import connectToDB from "./db/db.js";
import cookieParser from "cookie-parser";


import userRouter from "./routes/user.routes.js";
import captainRoute from "./routes/captain.routes.js";
import maps_router from "./routes/maps.routes.js";
import ride_router from "./routes/ride.routes.js";


const app = express();
//config
dotenv.config();
//mongo connection 
connectToDB();

//middleware 
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRouter);
app.use('/captains',captainRoute);
app.use('/maps',maps_router);
app.use('/rides',ride_router);
//routes
app.get('/',(req,res)=>{
    res.send("hello World");
})






export default app;