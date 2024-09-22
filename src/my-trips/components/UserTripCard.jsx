import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';

function UserTripCard ( { trip } )
{

    ////////////////////////////// Get Place Photo //////////////////////////////
    // 1. data object with the place's name for the text query
    // 2. GetPlaceDetails function to get the place details from the google api
    // 3. change the photo_URL's {NAME} with the photo reference id from the API response
    // 4. set the photoUrl in state 
    const [ photoUrl, setPhotoUrl ] = useState( '' )
    const GetPlacePhoto = async () =>
    {
        // Creating the data object with the place's name for the text query
        const data = { textQuery: trip?.userSelection?.location?.label }

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
        trip && GetPlacePhoto()
        console.log( photoUrl )
    }, [ trip ] )
    ////////////////////////////////////////////////////////////////////////


    // const deleteContacts = async ( id ) =>    // delete contact from firebase based on the id
    // {
    //     try
    //     {
    //         await deleteDoc( doc( db, "AI-Trips", id ) );   // COLLECTION NAME"AI-Trips" and ID

    //     } catch ( error )
    //     {
    //         console.log( error );
    //     }
    // };

    return (
        <Link to={ '/view-trip/' + trip?.id }>
            <div className='p-2 transition-all border shadow-md cursor-pointer hover:shadow-lg hover:scale-105 rounded-xl'>
                <img
                    className='object-cover rounded-xl 
               sm:h-[150px] sm:w-[280px] 
               md:h-[180px] md:w-[320px] 
               lg:h-[220px] lg:w-[380px] 
               xl:h-[250px] xl:w-[420px]'
                    src={ photoUrl || "/public/images.jpeg" }
                    alt="trip_location"
                />
                <div className='flex flex-row justify-between'>
                    <div>
                        <h2 className='text-lg font-bold'>{ trip?.userSelection?.location?.label }</h2>
                        <h2 className='text-sm text-gray-500'>{ trip?.userSelection?.no_of_days } Days trip with { trip?.userSelection?.budget } Budget</h2>
                    </div>
                    {/* <MdDelete className='mt-3 transition-all size-7 hover:size-9 text-slate-500' onClick={ ( e ) =>
                    {
                        e.stopPropagation(); // Prevent navigation
                        deleteContacts( trip?.id ); // Call delete function
                    } } /> */}
                </div>
            </div>
        </Link >
    )
}

export default UserTripCard
