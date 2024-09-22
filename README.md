# Demo : https://wander-ai-six.vercel.app/
# 🌍 WanderAI - Web-based AI Travel Planner

WanderAI is an AI-driven web-based travel planner that helps users plan their trips effortlessly. Users can register using Google authentication (OAuth), and once logged in, they can view their previous trip details stored in Firebase. With inputs like location, number of days, budget, and number of travelers, WanderAI generates trip suggestions including estimated costs, hotel recommendations, and a curated list of places to visit.


## ✨ Features

- User registration via Google OAuth
- Storing user trip details in Firebase
- AI-assisted trip planning.
- AI-generated trip suggestions.
- **Google Places Autocomplete** integration for trip location input (Ensure that the following Google Cloud APIs are enabled):
  - **Places API**
  - **Geocoding API**
  - **Geolocation API**
  - **Places API (New)**


## 🔧 Helper Functions

- **GetUserProfile**: Retrieves the Google account profile picture using the user's ID.
- **OnGenerateTrip**: Sends a request to the Gemini model to generate trip suggestions based on user inputs.
- **saveTrip**: Saves user details and trip information to Firebase.
- **GetUserTrip**: Fetches previous trip details from the database.

## 📚 Libraries Used

- **google/generative-ai**
- **firebase**
- **react-google-places-autocomplete**
- **react-router-dom**
- **axios**


---

😊 Feel free to explore, modify, and enhance this project to suit your needs. If you encounter any issues or have questions, don't hesitate to reach out.
