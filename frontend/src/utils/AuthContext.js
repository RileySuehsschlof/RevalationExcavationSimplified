import React, { createContext, useState, useEffect } from 'react';
import { getToken } from '../utils/auth.js';
import { jwtDecode } from 'jwt-decode';
// import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            // const decodedToken = jwt_decode(token);
            const decodedToken = jwtDecode(token);
            setUser({ username: decodedToken.username });
            console.log(decodedToken)
        }

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }; 
