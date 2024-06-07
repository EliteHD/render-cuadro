// context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setAuth: setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
