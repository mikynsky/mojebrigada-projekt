import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import DomuPage from "./pages/adminSide/DomuPage.jsx";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import SmenyPage from './pages/adminSide/SmenyPage.jsx';
import BrigadniciPage from './pages/adminSide/BrigadniciPage.jsx';
import LoginPage from './pages/adminSide/LoginPage.jsx';
import SmenyPageUser from './pages/userSide/SmenyPageUser.jsx';
import DomuPageUser from './pages/userSide/DomuPageUser.jsx';

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
    {
      path: "/smenyUser",
      element: <SmenyPageUser/>,
  },
  {
    path: "/domuUser",
    element: <DomuPageUser/>,
},
      
  ]);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />
 );
