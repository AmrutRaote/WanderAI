
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem ( { hotel } )
{
    const [ photoUrl, setPhotoUrl ] = useState( '' )

    ////////////////////////////// Get Place Photo //////////////////////////////
    // 1. data object with the place's name for the text query
    // 2. GetPlaceDetails function to get the place details from the google api
    // 3. change the photo_URL's {NAME} with the photo reference id from the API response
    // 4. set the photoUrl in state 
    // Function to get the photo of the place from Google Places API
    const GetPlacePhoto = async () =>
    {
        // Creating the data object with the hotel's name for the text query
        const data = { textQuery: hotel?.hotelName }

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
        hotel && GetPlacePhoto()
    }, [ hotel ] )
    ////////////////////////////////////////////////////////////////////////

    return (
        <div>
            < Link to={ 'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress } target='_blank'>
                <img src={ photoUrl || "/public/images.jpeg" } alt="hotel" className="md:h-[180px] h-[150px] w-full rounded-xl" />
                <div className='flex flex-col gap-2 mt-3'>
                    <h2 className='font-medium'>{ hotel?.hotelName }</h2>
                    <h2 className='text-xs text-gray-500'>📍 { hotel?.hotelAddress }</h2>
                    <h2 className='text-sm'>💰 { hotel?.price }</h2>
                    <h2 className='text-sm'>⭐ { hotel?.rating }</h2>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItem
