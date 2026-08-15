import axios from 'axios';
import captainModel from '../models/captain.model.js';

const getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }
    const apiKey = process.env.GEOAPIFY_GEOCODING_API_KEY;
    console.log("Geocoding address input:", address);

    let parts = address.split(/[\s,]+/).filter(Boolean);
    while (parts.length > 0) {
        const queryText = parts.join(" ");
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(queryText)}&format=json&apiKey=${apiKey}`;

        try {
            const response = await axios.get(url);
            if (response.data.results && response.data.results.length > 0) {
                const location = response.data.results[0];
                return {
                    ltd: location.lat,
                    lng: location.lon
                };
            } else if (response.data.features && response.data.features.length > 0) {
                const location = response.data.features[0];
                return {
                    ltd: location.properties.lat || location.geometry.coordinates[1],
                    lng: location.properties.lon || location.geometry.coordinates[0]
                };
            }
        } catch (error) {
            console.error(`Geocoding error for "${queryText}":`, error.response ? error.response.data : error.message);
        }

        // Fallback: drop the first word and search again (e.g. "tilkamangi bhagalpur" -> "bhagalpur")
        console.log(`Geocoding failed for "${queryText}". Attempting fallback...`);
        parts.shift();
    }

    throw new Error('Unable to fetch coordinates: Empty results from Geoapify even after fallback attempts');
}



const getDistanceTimeService = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    try {
        const originCoords = await getAddressCoordinate(origin);
        const destinationCoords = await getAddressCoordinate(destination);

        const apiKey = process.env.GEOAPIFY_ROUTING_API_KEY;
        const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoords.ltd},${originCoords.lng}|${destinationCoords.ltd},${destinationCoords.lng}&mode=drive&apiKey=${apiKey}`;

        const response = await axios.get(url);

        if (response.data.features && response.data.features.length > 0) {
            const route = response.data.features[0].properties;
            const distanceValue = route.distance; // meters
            const durationValue = route.time;     // seconds

            return {
                distance: `${(distanceValue / 1000).toFixed(1)} km`,
                distanceValue: distanceValue,
                duration: `${Math.round(durationValue / 60)} mins`,
                durationValue: durationValue
            };
        } else {
            throw new Error("Unable to calculate distance and time");
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getSuggestion = async (input)=>{
    if(!input){
        throw new Error("Input is required");

    }

    const apiKey = process.env.GEOAPIFY_AUTOCOMPLETE_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&format=json&apiKey=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data && response.data.results){
            return response.data.results.map(item => ({
                description: item.formatted
            }));
        } else if (response.data && response.data.features) {
            return response.data.features.map(item => ({
                description: item.properties.formatted
            }));
        } else {
            console.error("Geoapify Response:", response.data);
            throw new Error("Unable to fetch suggestions");
        }
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