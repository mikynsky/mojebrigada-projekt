import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import DomuPage from "./pages/DomuPage.js";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import SmenyPage from './pages/SmenyPage.js';
import BrigadniciPage from './pages/BrigadniciPage.js';
import LoginPage from './pages/LoginPage.js';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
        path: "/domu",
        element: <DomuPage/>,
      },
    {
        path: "/smeny",
        element: <SmenyPage/>,
    },
    {
        path: "/brigadnici",
        element: <BrigadniciPage/>,
    },
      
  ]);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />
 );
