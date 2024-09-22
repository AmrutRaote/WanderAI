import { Button } from "@/components/ui/button"
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";


function InfoSection ( { trip } )
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
        const data = { textQuery: trip?.userSelection?.location?.label }

        const result = await GetPlaceDetails( data ).then( res =>
        {
            // Constructing the photo URL using the photo reference from the API response
            // https://places.googleapis.com/v1/{NAME}/media?max_height_px=1000&max_width_px=1000&key=
            const PhotoURL = PHOTO_REF_URL.replace( '{NAME}', res.data.places[ 0 ].photos[ 1 ].name )
            setPhotoUrl( PhotoURL )
        } )
            .catch( ( err ) =>
            {
                console.log( err )

            } )
    }

    useEffect( () =>
    {
        trip && GetPlacePhoto()
    }, [ trip ] )
    ////////////////////////////////////////////////////////////////////////

    return (
        <div >
            <img src={ photoUrl || "/public/images.jpeg" } alt="home" className="h-[340px] w-full object-cover rounded-3xl" />

            <div className="flex items-center justify-between" >
                <div className="flex flex-col gap-2 my-2">
                    <h2 className="text-2xl font-bold">{ trip?.userSelection?.location?.label }</h2>
                    {/* <h2 className="text-2xl font-bold">{ trip?.userSelection?.location }</h2> */ }

                    <div className="flex flex-col gap-4 md:flex-row">
                        <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full w-fit md:text-base">📅 Days: { trip?.userSelection?.no_of_days } </h2>
                        <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full w-fit md:text-base">💰 Budget: { trip?.userSelection?.budget } </h2>
                        <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full w-fit md:text-base">🥂 No. of traveler: { trip?.userSelection?.traveler }</h2>
                        <h2 className="p-1 px-3 text-xs text-gray-500 bg-gray-200 rounded-full w-fit md:text-base">💸 Trip Cost: { <span className="font-bold text-green-600"> { trip?.tripData?.overallTripCost || "Not Available!" } </span> }</h2>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default InfoSection
