import crypto from 'crypto';
import RIDE_MODEL from "../models/ride.model.js";
import mapService from "./maps.service.js";
import { sendMessageToSocketId } from '../socket.js';

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceTimeService(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 15
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distanceValue / 1000) * perKmRate.auto) + ((distanceTime.durationValue / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distanceValue / 1000) * perKmRate.car) + ((distanceTime.durationValue / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distanceValue / 1000) * perKmRate.motorcycle) + ((distanceTime.durationValue / 60) * perMinuteRate.motorcycle))
    };

    return fare;
}

const createRide = async ({
    userId,
    pickup,
    destination,
    vehicleType,
})=>{
    if(!userId||!pickup||!destination||!vehicleType){
        throw new Error("All fields are required");
    }

    const distanceTime = await mapService.getDistanceTimeService(pickup, destination);
    const fare = await getFare(pickup,destination);

    const ride = await RIDE_MODEL.create({
        userId,
        pickup,
        destination,
        fare:fare[vehicleType],
        otp:getOtp(6),
        distance: distanceTime.distanceValue,
        duration: distanceTime.durationValue
    });

    const populatedRide = await RIDE_MODEL.findById(ride._id).populate('userId');
    return populatedRide;
}

function getOtp(num) {
    if (!num) {
        throw new Error("OTP length is required");
    }
    const min = Math.pow(10, num - 1);
    const max = Math.pow(10, num);
    const otp = crypto.randomInt(min, max).toString();
    return otp;
}

async function confirmRide({ rideId, captain }) {
    if(!rideId){
        throw new Error('Ride is required');
    }

    await RIDE_MODEL.findOneAndUpdate({_id:rideId},{
        status:"accepted",
        captain:captain._id
    })
    const ride = await RIDE_MODEL.findOne({_id:rideId}).populate('userId').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    
    return ride;
}
async function startRide({rideId,otp,captain}){
    if(!rideId||!otp){
        throw new Error('Ride Id and otp are required');
    }

    const ride = await RIDE_MODEL.findOne({_id:rideId,captain:captain._id}).populate('userId').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await RIDE_MODEL.findOneAndUpdate({_id:rideId},{
        status:'ongoing'
    });

    const updatedRide = await RIDE_MODEL.findOne({_id:rideId}).populate('userId').populate('captain');

    sendMessageToSocketId(updatedRide.userId.socketId,{
        event:'ride-started',
        data:updatedRide
    })

    return updatedRide;
}

async function endRide({rideId,captain}) {
    if(!rideId){
        throw new Error('Ride Id is required');
    }

    const ride = await RIDE_MODEL.findOne({_id:rideId}).populate('userId').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride not ongoing');
    }
    
    await RIDE_MODEL.findOneAndUpdate({_id:rideId},{
        status:'completed'
    });

    const updatedRide = await RIDE_MODEL.findOne({_id:rideId}).populate('userId').populate('captain');
    return updatedRide;
}
const rideService = {
    createRide,
    getFare,
    getOtp,
    confirmRide,
    startRide,
    endRide
};

export default rideService;
