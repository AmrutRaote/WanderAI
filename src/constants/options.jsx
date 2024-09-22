export const SelectTravelesList = [
    {
        id: 1,
        title: 'Just me',
        desc: "A solo traveles in exploring the world",
        icon: "✈",
        people: "1 person"
    },
    {
        id: 2,
        title: 'A couple',
        desc: "Two traveles in tandem",
        icon: "🥂",
        people: "2 people"
    },
    {
        id: 3,
        title: 'Family',
        desc: "A group of fun loving adv",
        icon: "🏡",
        people: "3 to 5 people"
    },
    {
        id: 5,
        title: 'Friends',
        desc: "A bunch of friends",
        icon: "⛵",
        people: "5 to 10 people"
    },

]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: "stay conscious of cost",
        icon: "💰"
    },
    {
        id: 2,
        title: 'Modrate',
        desc: "Keep cost on the average side",
        icon: "💸"
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "Dont worry about the cost",
        icon: "🏨"
    }

]


export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {days} Days for {traveler} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {days} days with each day plan with best time to visit and overall cost of this trip in JSON format.'
// export const AI_PROMPT = 'Generate Travel Plan for Location: {location} night with each day plan with best time to visit in JSON format.''