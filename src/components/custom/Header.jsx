import { useState } from "react"
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"


function Header ()
{
    const [ openDailog, setOpenDailog ] = useState( false )

    ////////////////////////////// Google Login button //////////////////////////////
    // 1. On click of the button, it will open the google login popup
    // 2. On success, it will call the GetUserProfile function and pass the token response
    const login = useGoogleLogin( {
        onSuccess: tokenResponse => GetUserProfile( tokenResponse ),
        onError: err => console.log( err )
    } );
    ////////////////////////////////////////////////////////////////////

    ////////////////////////////// Get User Profile //////////////////////////////
    // 1. Get the user profile from the google api and access_token
    // 2. Save the user profile in the local storage
    // 3. Close the dialog and reload the page
    const GetUserProfile = async ( tokenInfo ) =>
    {
        axios.get( `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${ tokenInfo?.access_token }`, {
            headers: {
                Authorization: `Bearer ${ tokenInfo?.access_token }`,
                Accept: 'Application/json'
            }
        } ).then( ( res ) =>
        {
            // 2. Save the user profile in the local storage
            localStorage.setItem( 'user', JSON.stringify( res.data ) )
            setOpenDailog( false )
            window.location.reload()
        } )
            .catch( ( err ) => console.log( err ) )
    }
    ////////////////////////////////////////////////////////////////////

    // Get the user profile from the local storage
    const user = JSON.parse( localStorage.getItem( 'user' ) )

    return (
        <div className="flex items-center justify-between p-3 px-5 shadow-sm">

            <a href={ '/' }>
                <img src="/logo.svg" alt="logo" />
            </a>

            {/* // If the user is logged in, show the create trip, my trips and logout button else show the sign in button */ }
            <div>
                { user ?
                    <div className="flex items-center gap-1 md:gap-5">
                        <a href="/create-trip">
                            <Button variant='outline' className='text-xs rounded-full'>Create Trip</Button>
                        </a>
                        <a href="/my-trips">
                            <Button variant='outline' className='text-xs rounded-full'>My Trips</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger><img src={ user?.picture || "/profile.jpg" } alt="profile" className="md:size-[40px] size-[35px] rounded-full" /></PopoverTrigger>
                            <PopoverContent>
                                <h2 className="cursor-pointer" onClick={ () =>
                                {
                                    googleLogout()
                                    localStorage.clear()
                                    window.location.reload()
                                } }>Log Out</h2>
                            </PopoverContent>
                        </Popover>
                    </div>

                    : <>
                        {/* // If the user is not logged in, show the sign in button */ }
                        <Button onClick={ () => setOpenDailog( true ) }>Sign In</Button>
                        <Dialog open={ openDailog }>
                            <DialogContent >
                                <DialogHeader>
                                    <DialogDescription>
                                        <img src="/logo.svg" alt="logo" />
                                        <h2 className='mt-5 text-lg font-bold text-black'>Sign-In with google</h2>
                                        <p className='text-base'>Sign in to the app with Google authentication securly </p>
                                        <Button
                                            className='w-full my-2 text-sm'
                                            onClick={ login }>
                                            <FcGoogle className='mx-2 text-xl ' />Sign in with Google
                                        </Button>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </> }
            </div>
        </div>
    )
}

export default Header
