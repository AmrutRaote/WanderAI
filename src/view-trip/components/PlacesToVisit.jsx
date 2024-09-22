
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit ( { trip } )
{
    return (
        <div className='mt-5'>
            <h2 className='text-xl font-bold'>Places To Visit</h2>

            <div className='mt-3'>
                { trip?.tripData?.itinerary.map( ( item, index ) => (
                    <div key={ index }>
                        <h2 className='text-lg font-bold'>{ item?.day }</h2>
                        <div className='grid gap-5 md:grid-cols-2'>
                            { item.plan.map( ( place, ind ) => (
                                <div key={ ind }>
                                    <h2 className='text-sm font-medium text-orange-400'><span className='text-black'>Best time to visit: </span>{ place.bestTimeToVisit }</h2>
                                    <div >
                                        <PlaceCardItem place={ place } />

                                        <br />
                                    </div>
                                </div>
                            ) ) }
                        </div>
                    </div>
                ) ) }
            </div>
        </div >
    )
}

export default PlacesToVisit
