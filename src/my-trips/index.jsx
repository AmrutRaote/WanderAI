import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';

import UserTripCard from './components/UserTripCard';


function MyTrips ()
{
    const navigation = useNavigate()
    const [ userTrips, setUserTrips ] = useState( [] )

    ////////////////////////////// Get User Trip //////////////////////////////
    // 1. check if the user is logged in or not
    // 2. Get the user trips from the firestore by useing the user email 
    // 3. append the user trips in the userTrips state
    const GetUserTrip = async () =>
    {
        const user = JSON.parse( localStorage.getItem( 'user' ) )
        if ( !user ) { navigation( '/' ); return }

        // 2. Get the user trips from the firestore by useing the user email 
        const queryy = query( collection( db, "AI-Trips" ), where( "userEmail", '==', user?.email ) );
        const querySnapshot = await getDocs( queryy )

        // 3. append the user trips in the userTrips state
        setUserTrips( [] )
        querySnapshot.forEach( ( doc ) =>
        {
            // doc.data() is never undefined for query doc snapshots
            console.log( doc.id, " => ", doc.data() );
            setUserTrips( prev => [ ...prev, doc.data() ] )
        } )
    }
    useEffect( () =>
    {
        GetUserTrip()
    }, [] )

    ////////////////////////////////////////////////////////////////////

    return (
        <div className='px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-60'>
            <h2 className='text-3xl font-bold'>My Trips</h2>

            {/* // If the user has trips, show the trips else show the loading animation */ }
            <div className='grid grid-cols-2 gap-5 mt-10 md:grid-cols-3'>
                { userTrips.length > 0 ? userTrips.map( ( trip, index ) => (
                    <div key={ index }>
                        <UserTripCard trip={ trip } />
                    </div>
                ) )
                    : [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].map( ( item, index ) => (
                        <div key={ index } className='h-[220px] w-[350px] bg-slate-200 animate-pulse rounded-xl'>

                        </div>
                    ) ) }
            </div>
        </div>
    )
}

export default MyTrips
