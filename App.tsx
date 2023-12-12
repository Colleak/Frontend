import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import LoadingComponent from "./src/components/LoadingComponents";
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const { authorize, clearCredentials } = useAuth0();

    useEffect(() => {
        async function loadFontsAsync() {
            await Font.loadAsync({
                'TTCommonsMedium': require('./src/assets/fonts/TTCommons-Medium.ttf'),
                // add more fonts later
            });
            setFontsLoaded(true);
        }

        loadFontsAsync();
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (!user) {
                authorize({ scope: 'openid profile email' })
                .then(credentials => {
                    // Successfully logged in
                    // Store the user's name and id in AsyncStorage
                    AsyncStorage.setItem('user', JSON.stringify(credentials));
                })
                .catch(error => console.log(error));
            }
        };

        checkUser();
    }, []);

    if (!fontsLoaded) {
        return <LoadingComponent/>;
    }

    return (
        <Auth0Provider domain={"dev-lohb1xoklmc7vqfg.us.auth0.com"} clientId={"1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC"}>
            <>
                <StatusBar barStyle="dark-content"/>
                <NavigationContainer>
                    <RootNavigator/>
                </NavigationContainer>
            </>
        </Auth0Provider>
    );
}

const styles = StyleSheet.create({

});
