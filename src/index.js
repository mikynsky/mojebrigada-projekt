import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import LoginPage from './pages/adminSide/LoginPage.jsx';
import DomuPage from "./pages/adminSide/DomuPage.jsx";
import SmenyPage from './pages/adminSide/SmenyPage.jsx';
import BrigadniciPage from './pages/adminSide/BrigadniciPage.jsx';
import SmenyPageUser from './pages/userSide/SmenyPageUser.jsx';
import DomuPageUser from './pages/userSide/DomuPageUser.jsx';
import SettingsPageAdmin from './pages/adminSide/SettingsPageAdmin.jsx';
import App from './components/App';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './hooks/ProtectedRoute.js';

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
    element: <ProtectedRoute><DomuPage/></ProtectedRoute>,
  },
  {
    path: "/smeny",
    element: <ProtectedRoute><SmenyPage/></ProtectedRoute>,
  },
  {
    path: "/brigadnici",
    element: <ProtectedRoute><BrigadniciPage/></ProtectedRoute>,
  },
  {
    path: "/smenyUser",
    element: <ProtectedRoute><SmenyPageUser/></ProtectedRoute>,
  },
  {
    path: "/domuUser",
    element: <ProtectedRoute><DomuPageUser/></ProtectedRoute>,
  },
  {
    path: "/settingsAdmin",
    element: <ProtectedRoute><SettingsPageAdmin/></ProtectedRoute>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);