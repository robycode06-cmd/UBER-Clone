import mongoose from 'mongoose';
import dotenv from 'dotenv';
import captainModel from './models/captain.model.js';

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected to MongoDB");

        const allCaptains = await captainModel.find({});
        console.log("Total Captains in DB:", allCaptains.length);
        allCaptains.forEach(captain => {
            console.log({
                id: captain._id,
                fullname: captain.fullname,
                status: captain.status,
                socketId: captain.socketId,
                location: captain.location
            });
        });

        await mongoose.disconnect();
    } catch(e) {
        console.error(e);
    }
};

test();
