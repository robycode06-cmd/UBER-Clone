import express from "express";
import { body, query } from "express-validator";
import rideController from "../controllers/ride.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const ride_router = express.Router();

 

ride_router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup location"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination"),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage("Invalid vehicle"),
    rideController.createRide
)

ride_router.get('/get-fair',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup'),
    rideController.getFareController);


ride_router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide

)

ride_router.get('/start-ride',
    authMiddleware.authCaptain,
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid Otp'),
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.startRide
)

ride_router.post('/end-ride',
    authMiddleware.authCaptain,
   
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)



export default ride_router;