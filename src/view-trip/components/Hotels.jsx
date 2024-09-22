
import HotelCardItem from './HotelCardItem'

function Hotels ( { trip } )
{
    return (
        <div>
            <h2 className='my-5 text-xl font-bold'>Hotel Recommendations</h2>

            <div className='grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4'>
                { trip?.tripData?.hotelOptions?.map( ( hotel, index ) => (
                    <div key={ index } className='transition-all cursor-pointer hover:scale-110'>
                        <HotelCardItem hotel={ hotel } />
                    </div>
                ) ) }
            </div>

            <br />

        </div>
    )
}

export default Hotels
