import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/v1/management/user-info', { withCredentials: true });
                if (response.status === 200 && response.data) {
                    setIsPremium(response.data.premium);
                } else {
                    setIsPremium(false);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setIsPremium(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <UserContext.Provider value={{ isPremium, setIsPremium, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
