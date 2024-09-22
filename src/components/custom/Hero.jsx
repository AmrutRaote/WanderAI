import { Link } from "react-router-dom"
import { Button } from "../ui/button"

function Hero ()
{
    return (
        <div className="flex flex-col items-center gap-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 sm:gap-8 md:gap-6 lg:gap-8 xl:gap-9">
            {/* <div className="flex flex-col items-center mx-32 gap-9"> */ }

            <h1 className="mt-16 text-xl font-extrabold text-center sm:text-xl lg:text-4xl md:text-3xl">
                <span className="text-[#F15757]">Discover Your Next Adventure with AI: <br /> </span>Personalized Itinerariesat Your Fingertips</h1>
            <p className="text-sm text-center text-gray-500 lg:text-xl md:text-base">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>


            <Link to='/create-trip'>
                <Button>Get Started, it&apos;s free</Button>
            </Link>


            <img src="/Dashboard.png" alt="Dashboard" className="mt-10 sm:h-[300px] sm:w-[500px] 
            md:h-[400px] md:w-[600px]
            lg:h-[533px] lg:w-[800px]
            xl:h-[600px] xl:w-[900px]
            hover:scale-105 transition-all" />
        </div >
    )
}

export default Hero
