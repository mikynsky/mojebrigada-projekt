import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Home from "./pages/Home.js";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/home",
        element: <Home/>,
      },
  ]);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />
 );
