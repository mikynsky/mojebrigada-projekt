import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState(null)
    //const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const privilegeLevel = decoded.privilegeLevel; 
            setIsAuthenticated(true);
            setRole(privilegeLevel || 'User');
        } else {
            setIsAuthenticated(false);
            setRole(null);
        }
        setIsLoading(false);
    }, []);

    const login = (privilegeLevel) => {
        console.log("Login function called");
        setIsAuthenticated(true);
        setRole(privilegeLevel);
        localStorage.setItem('privilegeLevel', privilegeLevel);
        //navigate('/domu')
    };

    const logout = () => {
        console.log("Logout function called");
        localStorage.removeItem('token')
        setIsAuthenticated(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);