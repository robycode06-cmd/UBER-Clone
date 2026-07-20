import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import BlacklistTokenModel from "../models/blacklistToken.model.js";


async function registerCaptain(req,res,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehicle} = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({email:email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message:"Captain already exist"});
    }
    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname:fullname.firstname
        ,lastname:fullname.lastname
        ,email:email
        ,password:hashPassword,
        color:vehicle.color
        ,plate:vehicle.plate
        ,capacity:vehicle.capacity
        ,vehicleType:vehicle.vehicleType
    })
    const token = await captain.generateToken();
    return res.status(201).json({token,captain});
}

async function loginCaptain(req,res,next){
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");
    
    if(!captain){
        return res.status(401).json({message:"Invali Email or Password"});
    }
    const is_password_correct = await captain.comparePassword(password);
    if(!is_password_correct){
        return res.status(400).json({message:"Invalid Email or Password"})
    }

    const token = captain.generateToken();
    res.cookie('token',token);

    return res.status(201).json({token,captain});


}

async function getCaptainProfile(req,res,next){
    return res.status(200).json({captain : req.captain});
}

async function logoutCaptain(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistTokenModel.create({token});

    res.clearCookie('token');
    res.status(200).json({message:"Logout Successfully"});
}

const captainController = {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain};
export default captainController;