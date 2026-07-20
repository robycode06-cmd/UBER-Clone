import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";


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


const captainController = {registerCaptain};
export default captainController;