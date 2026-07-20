import captainModel from "../models/captain.model.js";

async function createCaptain({firstname,lastname,email,password,color,plate,capacity,vehicleType}){
    if(!firstname||!lastname||!email||!password||!color||!plate||!capacity||!vehicleType){
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname:{
            firstname:firstname,
            lastname:lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            vehicleType,
            capacity
        }
    })
    return captain
}

const captainService = {createCaptain};
export default captainService;