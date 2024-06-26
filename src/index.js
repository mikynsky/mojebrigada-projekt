// Importy stránek pro administrační a uživatelské rozhraní
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
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './hooks/ProtectedRoute.js';
import SettingsPageUser from "./pages/userSide/SettingsPageUser.jsx";


// Vytvoření routeru s definicemi cest a přiřazenými komponentami
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
   // Ostatní cesty jsou chráněny komponentou ProtectedRoute, která zkontroluje, jestli má uživatel příslušnou roli a JWT token
   // V případě problémů komponenta ErrorBoundary zachytí a zobrazí chyby
  {
    path: "/domu",
    element: <ProtectedRoute allowedRoles={['Admin']}><ErrorBoundary><DomuPage/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/domuUser",
    element: <ProtectedRoute allowedRoles={['User']}><ErrorBoundary><DomuPageUser/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/smeny",
    element: <ProtectedRoute allowedRoles={['Admin']}><ErrorBoundary><SmenyPage/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/brigadnici",
    element: <ProtectedRoute allowedRoles={['Admin']}><ErrorBoundary><BrigadniciPage/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/smenyUser",
    element: <ProtectedRoute allowedRoles={['User']}><ErrorBoundary><SmenyPageUser/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/domuUser",
    element: <ProtectedRoute allowedRoles={['User']}><ErrorBoundary><DomuPageUser/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/settingsAdmin",
    element: <ProtectedRoute allowedRoles={['Admin']}><ErrorBoundary><SettingsPageAdmin/></ErrorBoundary></ProtectedRoute>,
  },
  {
    path: "/settingsUser",
    element: <ProtectedRoute allowedRoles={['User']}><ErrorBoundary><SettingsPageUser/></ErrorBoundary></ProtectedRoute>,
  },
]);

// Vytvoření kořenového elementu React aplikace
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderování aplikace s Context providerem a RouterProviderem
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);