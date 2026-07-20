import express from "express";
import { body } from "express-validator";
import captainController from "../controllers/captain.controller.js";

const captainRoute = express.Router();

captainRoute.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name must be atleast 3 char long'),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 characters long"),
    body('vehicle.color').isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid')


],captainController.registerCaptain)




export default captainRoute