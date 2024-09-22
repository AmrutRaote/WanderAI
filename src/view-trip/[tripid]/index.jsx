
import { db } from '@/service/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from 'sonner'

import InfoSection from '../components/InfoSection'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'

function Viewtrip ()
{
    // Get the trip id from the URL
    const { tripId } = useParams()
    const [ trip, setTrip ] = useState( [] )
    const navigation = useNavigate()


    ////////////////////////////// Get Trip Data //////////////////////////////
    // 1. Get the trip data from the firestore by using the trip id
    const GetTripData = async () =>
    {
        const user = JSON.parse( localStorage.getItem( 'user' ) )
        if ( !user ) { navigation( '/' ); return }

        const docref = doc( db, "AI-Trips", tripId )
        const docSnap = await getDoc( docref )

        if ( !docSnap.exists() )
        {
            console.log( "no data found!" )
            toast( "No trip found" )
        }
        else
        {
            setTrip( docSnap.data() )
            console.log( "DOc:", docSnap.data() )
        }
    }

    useEffect( () =>
    {
        GetTripData();
    }, [ tripId ] )
    ////////////////////////////////////////////////////////////////////////

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56 ">
            {/* Information section */ }
            <InfoSection trip={ trip } />

            {/* Recommended Hotel */ }
            <Hotels trip={ trip } />

            {/* Daily plans */ }
            <PlacesToVisit trip={ trip } />

        </div>
    )
}

export default Viewtrip
