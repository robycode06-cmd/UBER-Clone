import USER_MODEL from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BlacklistTokenModel from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";

const authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unautorized"});
    }
    const isBlackListed = await BlacklistTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await USER_MODEL.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unautorized"});
    }
}

const authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unautorized"});
    }
    const isBlackListed = await BlacklistTokenModel.findOne({token:token});
    if(isBlackListed){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unautorized"});
    }
}
const authMiddleware = {authUser,authCaptain};

export default authMiddleware;
