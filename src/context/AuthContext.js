import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


// Vytvoření kontextu pro autentizaci
const AuthContext = createContext(null);

// Provider komponenta, která obaluje části aplikace a poskytuje autentizační stav
export const AuthProvider = ({ children }) => {
    // Stavové proměnné pro autentizaci a role
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState(null)
    
    // Efekt, který se spustí při načtení komponenty, zkontroluje lokální úložiště pro token
    useEffect(() => {
        const token = localStorage.getItem('token'); // Načtení token z lokálního úložiště
        if (token) {
            const decoded = jwtDecode(token); // Dekódování JWT
            const privilegeLevel = decoded.privilegeLevel; // Získání úrovně práv z dekódovaného token
            setIsAuthenticated(true); // Nastavení autentizovaného stavu na true
            setRole(privilegeLevel || 'User'); // Nastavení role nebo výchozí role 'User'
        } else {
            setIsAuthenticated(false); // Nenalezen token, uživatel není autentizovaný
            setRole(null); // Role není nastavena
        }
        setIsLoading(false); // Nastavení načítání na false po inicializaci
    }, []);

    // Funkce pro přihlášení uživatele
    const login = (privilegeLevel) => {
        console.log("Login function called"); 
        setIsAuthenticated(true); // Nastavení autentizovaného stavu na true
        setRole(privilegeLevel); // Nastavení role
        localStorage.setItem('privilegeLevel', privilegeLevel); // Uložení role do lokálního úložiště
    };

    // Funkce pro odhlášení uživatele
    const logout = () => {
        console.log("Logout function called");
        localStorage.removeItem('token') // Odstranění token z lokálního úložiště
        setIsAuthenticated(false); // Nastavení autentizovaného stavu na false
        setRole(null); // Odstranění role
    };

    // Poskytnutí kontextu pro komponenty nižší úrovně
    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook pro snadný přístup k AuthContextu z jiných komponent
export const useAuth = () => useContext(AuthContext);