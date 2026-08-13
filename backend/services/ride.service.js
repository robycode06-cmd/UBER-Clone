import crypto from 'crypto';
import RIDE_MODEL from "../models/ride.model.js";
import mapService from "./maps.service.js";

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

    const fare = await getFare(pickup,destination);

    const ride = RIDE_MODEL.create({
        userId,
        pickup,
        destination,
        fare:fare[vehicleType],
        otp:getOtp(6),
        

    })

    return ride;

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

const rideService = {
    createRide,
    getFare,
    getOtp
};

export default rideService;
