import axios from "axios"

// Defining the base URL for the Google Places API, specifically for searching by text
const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'


// Defining the configuration object for the POST request to the Google Places API 
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        // Setting the field mask to specify which fields should be included in the API response
        'X-Goog-FieldMask': [
            'places.photos',         // Include photos of the places in the response
            'places.displayName',    // Include the display name of the places in the response
            'places.id',             // Include the unique ID of the places in the response
        ]
    }
};


// Exporting a function called `GetPlaceDetails` which accepts `data` as an argument.
// It makes a POST request to the Google Places API endpoint, passing the `data`
// and the `config` object to customize the request headers.
export const GetPlaceDetails = ( data ) => axios.post( BASE_URL, data, config )

export const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?max_height_px=1000&max_width_px=1000&key=" + import.meta.env.VITE_GOOGLE_MAPS_API_KEY
