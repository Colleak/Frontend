import React, { useEffect, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from "./LoadingComponents";

const AuthCheck: React.FC = () => {
    const { authorize, user, isLoading } = useAuth0();

    useEffect(() => {
        const initializeAuthCheck = async () => {
            // Check if user information is stored in AsyncStorage
            const storedUser = await AsyncStorage.getItem('user');

            // If there is no stored user, then prompt for login
            if (!storedUser && !isLoading) {
                try {
                    await authorize();
                    // After successful login, save the user's name in AsyncStorage
                    if (user && user.name) {
                        await AsyncStorage.setItem('user', user.name);
                    }
                } catch (e) {
                    console.error('Error authorizing user:', e);
                }
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // TODO: still not working, have to fix for someone canceling login
        };
        initializeAuthCheck();
    }, [isLoading, user]);

    return null;
};

export default AuthCheck;
