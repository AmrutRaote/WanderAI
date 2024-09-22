import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useGoogleLogin } from '@react-oauth/google';
import { chatSession } from '@/service/AIModal';

import { Button } from '@/components/ui/button';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import axios from 'axios';

import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



function CreateTrip ()
{
    const [ place, setPlace ] = useState()
    const [ openDailog, setOpenDailog ] = useState( false )
    const [ formData, setFormData ] = useState( [] )
    const [ loading, setLoading ] = useState( false )

    const navigation = useNavigate()

    ////////////////////////// Handle Input Change //////////////////////////
    // 1. On change of the input field, it will set the value in the form data 
    // fromData contain old data and new data
    const handleInputChange = ( name, value ) =>
    {
        setFormData( {
            ...formData,
            [ name ]: value
        } )
    }
    //////////////////////////////////////////////////////////////////////////

    ////// Google Login button //////
    // 1. On click of the button, it will open the google login popup
    // 2. On success, it will call the GetUserProfile function and pass the token response
    const login = useGoogleLogin( {
        onSuccess: tokenResponse => GetUserProfile( tokenResponse ),
        onError: err => console.log( err )
    } );
    //////////////////////////////////////////////////////////////////////////



    ////// Generate Trip //////
    // 1. Check if user is logged in. If not, open the dialog and do login process
    // 2. Check if user has filled all the details
    // 3. replace the AI_PROMPT with user details and send the message to the GEMINI
    // 4. Call the saveTrip function and pass the response from the GEMINI
    const OnGenerateTrip = async () =>
    {
        try
        {

            const user = localStorage.getItem( "user" )
            if ( !user )
            {
                setOpenDailog( true );
                return
            }


            if ( ( !formData?.location || !formData?.budget || !formData?.traveler ) && !formData )
            {
                setLoading( false )
                toast( "Please fill all details!" )
                return
            }

            if ( formData?.no_of_days >= 10 || formData?.no_of_days <= 1 )
            {
                setLoading( false )
                toast( "Please enter the days between 1 to 10!" )
                return
            }

            // 3. replace the AI_PROMPT with user details and send the message to the GEMINI
            setLoading( true )
            const FINAL_PROMT = AI_PROMPT.replace( "{location}", formData?.location?.label )
                .replace( "{days}", formData?.no_of_days )
                .replace( "{traveler}", formData?.traveler )
                .replace( "{budget}", formData?.budget )
                .replace( "{days}", formData?.no_of_days )

            const result = await chatSession.sendMessage( FINAL_PROMT )

            // 4. Call the saveTrip function and pass the response from the GEMINI
            setLoading( false )
            saveTrip( result?.response?.text() )
        } catch ( error )
        {
            setLoading( false )
            toast( "Something is wrong!" )
            console.log( error )
        }
    }
    //////////////////////////////////////////////////////////////////////////

    ////////////////////////// Save Trip //////////////////////////
    // 1. set the database details
    // 2. Save the trip data in the firebase [userSelection: users input, tripData: AI response, userEmail: user email, id: unique id]
    // 3. Redirect to the view trip page
    const saveTrip = async ( TripData ) =>
    {
        try
        {

            setLoading( true )

            const user = JSON.parse( localStorage.getItem( 'user' ) )

            // 1. set the database details
            const docID = Date.now().toString()
            const docref = doc( db, "AI-Trips", docID )
            console.log( TripData )
            if ( !TripData )
            {
                setLoading( false )
                return toast( "Something is wrong!" );
            }

            // 2. Save the trip data in the firebase [userSelection: users input, tripData: AI response, userEmail: user email, id: unique id]
            await setDoc( docref, {
                userSelection: formData,
                tripData: JSON.parse( TripData ),
                userEmail: user?.email,
                id: docID
            } )

            setLoading( false )

            // 3. Redirect to the view trip page
            navigation( '/view-trip/' + docID )

        } catch ( error )
        {
            setLoading( false )
            toast( "Something is wrong please try again!" )
            console.error( error )
        }
    }
    //////////////////////////////////////////////////////////////////////////


    ////// Get User Profile //////
    // 1. Get the user profile from the google api and access_token
    // 2. Save the user profile in the local storage
    // 3. Close the dialog
    // 4. Call the OnGenerateTrip function
    const GetUserProfile = async ( tokenInfo ) =>
    {
        // 1. Get the user profile from the google api and access_token
        axios.get( `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${ tokenInfo?.access_token }`, {
            headers: {
                Authorization: `Bearer ${ tokenInfo?.access_token }`,
                Accept: 'Application/json'
            }
        } ).then( ( res ) =>
        {
            console.log( res )
            localStorage.setItem( 'user', JSON.stringify( res.data ) )
            setOpenDailog( false )
            OnGenerateTrip()
        } )
            .catch( ( err ) => console.log( err ) )
    }
    //////////////////////////////////////////////////////////////////////////

    return (
        <div className="px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-60">
            <h2 className="text-3xl font-bold">Tell us your travel preferences 🏕</h2>
            <p className="mt-3 text-xl text-gray-500">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>


            <div className="flex flex-col gap-10 mt-20">
                <div>
                    <h2 className="my-3 text-xl font-medium">What is destination?</h2>
                    <GooglePlacesAutocomplete //// Google Places Autocomplete for the location

                        apiKey={ import.meta.env.VITE_GOOGLE_MAPS_API_KEY }
                        selectProps={ {
                            place,
                            onChange: ( e ) =>
                            {
                                setPlace( e );
                                handleInputChange( 'location', e )
                            }
                        } }
                    />
                    {/* <input
                        className='w-full p-2 border border-gray-500 rounded-md'
                        onChange={ ( e ) => { setPlace( e ); handleInputChange( "location", e.target.value ) } }
                        type="text"
                        placeholder='Mumbai' /> */}

                </div>

                {/* // 2. set the number of days for the trip */ }
                <div>
                    <h2 className="my-3 text-xl font-medium">How many days are you planning your trip?</h2>
                    <input

                        className='w-full p-2 border border-gray-500 rounded-md'
                        onChange={ ( e ) => handleInputChange( "no_of_days", e.target.value ) }
                        type="number"
                        placeholder='Ex. 3'
                        min="1"
                        max="10"
                    />
                    {/* min="0" max="11" /> */ }
                </div>

                {/* // 3. set the budget for the trip */ }
                <div>
                    <h2 className="my-3 text-xl font-medium">What is your budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 '>
                        { SelectBudgetOptions.map( ( item, index ) =>
                        (
                            <div key={ index } onClick={ () => handleInputChange( "budget", item.title ) }
                                className={ `p-4 border rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-all hover:shadow-md ${ formData?.budget === item.title && 'shadow-xl scale-105 border-slate-500' }` }>
                                <h2 className='text-4xl'>{ item.icon }</h2>
                                <h2 className='text-lg font-bold'>{ item.title }</h2>
                                <h2 className='text-sm text-gray-400'>{ item.desc }</h2>
                            </div>
                        ) ) }

                    </div>
                </div>

                {/* // 4. set the number of travelers for the trip */ }
                <div>
                    <h2 className="my-3 text-xl font-medium">Who do you plan on traveling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        { SelectTravelesList.map( ( item, index ) =>
                        (
                            <div key={ index } onClick={ () => handleInputChange( "traveler", item.people ) }
                                className={ `p-4 border rounded-lg cursor-pointer shadow-sm hover:scale-105 transition-all hover:shadow-md ${ formData?.traveler === item.people && 'shadow-xl scale-105 border-slate-500' }` }>
                                <h2 className='text-4xl'>{ item.icon }</h2>
                                <h2 className='text-lg font-bold'>{ item.title }</h2>
                                <h2 className='text-base text-gray-400'>{ item.desc }</h2>
                                <h2 className='text-sm text-gray-400'>{ item.people }</h2>
                            </div>
                        ) ) }

                    </div>
                </div>
            </div>

            {/* // 5. Generate Trip Button */ }
            <div className='flex justify-end my-10'>
                <Button disabled={ Object.keys( formData ).length < 4 || loading } onClick={ OnGenerateTrip } >
                    { loading ? <AiOutlineLoading3Quarters className='size-7 animate-spin' /> : "Generate Trip!" }
                </Button>
            </div>

            {/* // 6. Google Login Dialog */ }
            <Dialog open={ openDailog }>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src="/logo.svg" alt="logo" />
                            <h2 className='mt-5 text-lg font-bold text-black'>Sign-In with google</h2>
                            <p className='text-base'>Sign in to the app with Google authentication securly </p>
                            <Button
                                disabled={ loading }
                                className='w-full my-2 text-sm'
                                onClick={ login }> {/* // call the login function*/ }
                                <FcGoogle className='mx-2 text-xl ' />Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateTrip
