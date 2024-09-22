import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem ( { place } )
{
    const [ photoUrl, setPhotoUrl ] = useState( '' )

    ////////////////////////////// Get Place Photo //////////////////////////////
    // 1. data object with the place's name for the text query
    // 2. GetPlaceDetails function to get the place details from the google api
    // 3. change the photo_URL's {NAME} with the photo reference id from the API response
    // 4. set the photoUrl in state 
    const GetPlacePhoto = async () =>
    {
        // Creating the data object with the place's name for the text query
        const data = { textQuery: place?.placeName }

        const result = await GetPlaceDetails( data ).then( res =>
        {
            // Constructing the photo URL using the photo reference from the API response
            // https://places.googleapis.com/v1/{NAME}/media?max_height_px=1000&max_width_px=1000&key=
            const PhotoURL = PHOTO_REF_URL.replace( '{NAME}', res.data.places[ 0 ].photos[ 3 ].name )
            setPhotoUrl( PhotoURL )
        } )
            .catch( ( err ) =>
            {
                console.log( err )

            } )
    }

    useEffect( () =>
    {
        place && GetPlacePhoto()
    }, [ place ] )
    ////////////////////////////////////////////////////////////////////////


    return (
        <Link to={ 'https://www.google.com/maps/search/?api=1&query=' + place?.placeName } target='_blank'>
            <div className='flex gap-5 p-3 mt-1 transition-all border shadow-md cursor-pointer rounded-2xl hover:scale-105 hover:shadow-lg'>
                <img src={ photoUrl || "/public/images.jpeg" } alt="home" className="md:size-[130px] size-[140px]  rounded-xl object-cover" />
                <div>
                    <h2 className='text-lg font-bold'>{ place.placeName }</h2>
                    <p className='text-sm text-gray-400'>{ place.placeDetails }</p>
                    <h2 className='mt-1 text-base font-medium'>🕔 { place.timeToTravel }</h2>
                </div>
            </div >
        </Link>
    )
}

export default PlaceCardItem
