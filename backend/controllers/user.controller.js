import { validationResult } from "express-validator";
import USER_MODEL from "../models/user.model.js";
import userService from "../services/user.service.js";

async function registerUser(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    console.log(req.body);

    const {fullname,email,password}=req.body;

    const hashedPassword = await USER_MODEL.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
    })
    
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}
const userController = {registerUser}
export default userController;