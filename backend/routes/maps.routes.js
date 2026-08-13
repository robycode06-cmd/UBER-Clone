import express from "express";



import authMiddleware from "../middlewares/auth.middleware.js";
import mapController from "../controllers/map.controllers.js";

const maps_router = express.Router();

maps_router.get('/get-coordinates',authMiddleware.authUser,mapController.getCoordinates);

maps_router.get('/get-distanceTime',authMiddleware.authUser,mapController.getDistanceTime);

maps_router.get('/suggestion',authMiddleware.authUser,mapController.getAutoCompleteSuggestion);

 

export default maps_router;