import mongoose from "mongoose";
import { type } from "os";

const rideSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',//according to model name
        required:true,
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captainModel',
        
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','canceled'],
        default:'pending',
    },
    duration:{
        type:Number,
    },//in seconds
    distance:{
        type:Number,
    },//in meters
    paymentID:{
        type:String,

    },
    orderID:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
    }
    
})

const RIDE_MODEL = mongoose.model('ride_model',rideSchema);
export default RIDE_MODEL;