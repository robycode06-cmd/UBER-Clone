import { validationResult } from "express-validator";
import rideService from "../services/ride.service.js";
import mapService from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";


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
        CaptainsInRadius.map(async (captain)=>{
            console.log(captain,ride);
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:ride
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

const rideController = {createRide,getFareController};

export default rideController;