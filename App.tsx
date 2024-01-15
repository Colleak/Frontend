import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, Button } from 'react-native';
import Auth0 from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingComponent from "./src/components/LoadingComponents";
import * as Font from 'expo-font';
import { Alert } from 'react-native';
import { NetworkInfo } from "react-native-network-info";

const auth0 = new Auth0({
    domain: 'dev-lohb1xoklmc7vqfg.us.auth0.com',
    clientId: '1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC'
});

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load fonts
    useEffect(() => {
        async function loadFontsAsync() {
            await Font.loadAsync({
                'TTCommonsMedium': require('./src/assets/fonts/TTCommons-Medium.ttf'),
            });
            setFontsLoaded(true);
        }

        loadFontsAsync();
    }, []);

   // Authentication
useEffect(() => {
    const login = async () => {
        try {
            await auth0.webAuth.authorize({ scope: 'openid profile email' });
            setIsAuthenticated(true); // Set authenticated state on successful login

            // Get Local IP
            const ipAddress = await NetworkInfo.getIPAddress();
            console.log('Local IP:', ipAddress);
        } catch (error) {
            console.log('Authentication error:', error);
        }
    };

    if (!isAuthenticated) {
        login();
    }
}, [isAuthenticated]);

    // Render
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                {!fontsLoaded || !isAuthenticated ? (
                    <LoadingComponent />
                ) : (
                    <RootNavigator />
                )}
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({

});
