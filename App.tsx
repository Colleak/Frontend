import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import LoadingComponent from "./src/components/LoadingComponents";
import { Auth0Provider } from 'react-native-auth0';
import AuthCheck from './src/components/AuthCheck';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        async function loadFontsAsync() {
            try {
                await Font.loadAsync({
                    'TTCommonsMedium': require('./src/assets/fonts/TTCommons-Medium.ttf'),
                    // add more fonts later
                });
                setFontsLoaded(true);
            } catch (e) {
                console.log('Error loading fonts:', e);
            }
        }
        loadFontsAsync();
    }, []);

    useEffect(() => {
        const checkUser = async () => {
            const user = await AsyncStorage.getItem('user');
            setUserLoaded(!!user);
        };

        checkUser();
    }, []);

    return (
        <Auth0Provider domain={"dev-lohb1xoklmc7vqfg.us.auth0.com"} clientId={"1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC"}>
            <>
                <StatusBar barStyle="dark-content"/>
                <NavigationContainer>
                    <AuthCheck />
                    {!fontsLoaded || !userLoaded ? <LoadingComponent/> : <RootNavigator/>}
                </NavigationContainer>
            </>
        </Auth0Provider>
    );
}

const styles = StyleSheet.create({

});