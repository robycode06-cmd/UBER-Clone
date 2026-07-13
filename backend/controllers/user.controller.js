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

async function loginUser(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password}= req.body;
    const user = await USER_MODEL.findOne({email:email}).select('+password');

    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = user.generateAuthToken();

    return res.status(200).json({token,user});

}
const userController = {registerUser,loginUser}
export default userController;