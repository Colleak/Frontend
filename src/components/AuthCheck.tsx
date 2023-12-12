import React, { useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthCheck: React.FC = () => {
    const { authorize } = useAuth0();

    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (!user) {
                try {
                    await authorize();
                } catch (e) {
                    console.log(e);
                }
            }
        };

        checkUser();
    }, []);

    return null;
};

export default AuthCheck;