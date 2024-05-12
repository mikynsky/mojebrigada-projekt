import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

// Komponenta ProtectedRoute pro ochranu cest podle rolí uživatele
function ProtectedRoute({ children, allowedRoles }) {
  // Destructuring pro získání stavů a role z autentizačního kontextu
  const { isAuthenticated, isLoading, role } = useAuth();

  // Pokud se načítají data, zobrazí se indikátor načítání
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Pokud uživatel není autentizován, dojde k přesměrování na přihlašovací stránku
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kontrola, zda role uživatele odpovídá jedné z povolených rolí
  // Při nesplnění dojde k přesměrování na přihlašovací stránku (můžete změnit na jinou chybovou stránku)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  // Pokud všechny kontroly projdou, vrátí se dětské komponenty, které ProtectedRoute obaluje
  return children
}

// Exportování komponenty pro použití v jiných částech aplikace
export default ProtectedRoute;