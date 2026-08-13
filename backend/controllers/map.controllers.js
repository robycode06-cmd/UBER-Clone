import mapService from "../services/maps.service.js";
import { validationResult } from 'express-validator';

const getCoordinates= async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {address} = req.query; 
    try{
        const coordinate = await mapService.getAddressCoordinate(address);
        return res.status(200).json(coordinate);
    }catch(error){
        return res.status(404).json({message:"Coordinate not found"});
    }
}

const getDistanceTime = async (req,res,next)=>{
    try{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       }

       const {origin,destination}=req.query;
       
       const distanceTime = mapService.getDistanceTimeService(origin,destination);
       
       res.status(200).json({
            distance:(await distanceTime).distance,
            distanceValue:(await distanceTime).distanceValue,
            duration:(await distanceTime).duration,
            durationValue:(await distanceTime).durationValue
    
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({message:"Internal Server error"});
    }
}


const getAutoCompleteSuggestion = async(req,res,next)=>{
    try{    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
 
        }

        const {input}= req.query;

        const suggestions = await mapService.getSuggestion(input);
        return res.status(200).json(suggestions);
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
const mapController = {getCoordinates,getDistanceTime,getAutoCompleteSuggestion};
export default mapController;