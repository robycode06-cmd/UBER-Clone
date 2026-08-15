import { validationResult } from "express-validator";
import rideService from "../services/ride.service.js";
import mapService from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import RIDE_MODEL from "../models/ride.model.js";


const createRide = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        

    }
    const {pickup,destination,vehicleType,} = req.body;
    const userId = req.user._id;
    try{
        const ride = await rideService.createRide({userId,pickup,destination,vehicleType});
        
        const pickup_coordinate = await mapService.getAddressCoordinate(pickup);
        console.log(pickup_coordinate);
        const CaptainsInRadius = await mapService.getCaptainsInTheRadius(pickup_coordinate.ltd,pickup_coordinate.lng,2);
        console.log("Captains:", CaptainsInRadius);
        console.log("Number of captains:", CaptainsInRadius.length);
        ride.otp="";
        const ride_with_user = await RIDE_MODEL.findOne({_id:ride._id}).populate('userId');

        CaptainsInRadius.map(async (captain)=>{
            console.log(captain,ride);
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data: ride_with_user
            })
        })
        return res.status(201).json({
            ride,
            CaptainsInRadius
        });
    }catch(error){
        return res.status(400).json({message:error.message});
    }
    

}

const getFareController = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors.array()});
        
    }

    const {pickup,destination}=req.query;
    try{
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const confirmRide = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {rideId} = req.body;
    
    try{
        console.log("Confirming ride with ID:", rideId, "for Captain ID:", req.captain._id);
        const ride = await rideService.confirmRide({rideId,captain:req.captain});
        console.log("Ride confirmed in DB:", ride._id, "Status:", ride.status);
        console.log("Passenger User details:", ride.userId);
        console.log("Passenger Socket ID target:", ride.userId ? ride.userId.socketId : "No user document");

        sendMessageToSocketId(ride.userId.socketId,{
            event: 'ride-confirmed',
            data:ride
        })
        return res.status(200).json(ride);

    }catch(err){
        console.log("Error inside confirmRide controller:", err);
        return res.status(500).json({message:err.message});
    }


}

const startRide = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erorrs:errors.array()});
    }
    const {rideId,otp} = req.query;
    try{
        const ride = await rideService.startRide({rideId,otp,captain:req.captain});
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

const endRide = async(req,res,next)=>{
     const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erorrs:errors.array()});
    }
     const {rideId} = req.body;
    try{
        const ride = await rideService.endRide({rideId,captain:req.captain});
        sendMessageToSocketId(ride.userId.socketId,{
            event:'ride-ended',
            data:ride
        })

        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
const rideController = {createRide,getFareController,confirmRide,startRide,endRide};

export default rideController;