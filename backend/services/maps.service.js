import axios from 'axios';
import captainModel from '../models/captain.model.js';

const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}



const getDistanceTimeService = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status !== "OK") {
            throw new Error(response.data.error_message || "Unable to calculate distance");
        }

        const element = response.data.rows[0].elements[0];

        return {
            distance: element.distance.text,
            distanceValue: element.distance.value, // meters
            duration: element.duration.text,
            durationValue: element.duration.value  // seconds
        };

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getSuggestion = async (input)=>{
    if(!input){
        throw new Error("Input is required");

    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try{
        const responce = await axios.get(url);
        if(responce.data.status!=="OK"){
            throw new Error(responce.data.error_message);

        }

        return responce.data.predictions;
    }catch(error){
        console.log(error);
        throw error;
    }
}

const getCaptainsInTheRadius = async (ltd, lng, radius) => {

    console.log("Searching location:", ltd, lng);

    const allCaptains = await captainModel.find({});

    console.log("All captains:", allCaptains.map(captain => ({
        id: captain._id,
        location: captain.location,
        status: captain.status
    })));


    //radius in km
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [
          [lng, ltd], 
          radius / 6371
        ]
      }
    }
  });
  
  return captains;
};
const mapService = {getAddressCoordinate,getDistanceTimeService,getSuggestion,getCaptainsInTheRadius};

export default mapService;