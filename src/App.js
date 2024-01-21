import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import Home from './pages/Home';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';


const Layout = () =>{
  return(
    <div>
      <Navbar/>
      <ScrollRestoration/>
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
};

const router = createBrowserRouter([
  {path: "/",
  element:<Layout/>,
  children:[
    {
      path: '/',
      element:<Home />,
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element:<Signup/>
    }
  ]
  }
])

function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const apiKey = '41889997-7e8f4b2b33eb278091ad77500';
        const response = await axios.get(
          `https://pixabay.com/api/?key=${apiKey}&q=mountain%20night&image_type=photo`
        );

        const randomImage =
          response.data.hits[
            Math.floor(Math.random() * response.data.hits.length)
          ];

        setBackgroundImage(randomImage.largeImageURL);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };
  return (
    <div style={divStyle}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;