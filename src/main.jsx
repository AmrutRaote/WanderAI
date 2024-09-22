import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';

import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import Viewtrip from './view-trip/[tripid]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import Footer from './components/custom/Footer.jsx'



////////////////////////////// Router //////////////////////////////
// only the routes that are defined here will be accessible by using router
const router = createBrowserRouter( [
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create-trip",
    element: <CreateTrip />

  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />

  },
  {
    path: "/my-trips",
    element: <MyTrips />

  }
] )

createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID }>
      <Header />
      <Toaster />
      <RouterProvider router={ router } />
      <Footer />
    </GoogleOAuthProvider>
  </StrictMode>
)