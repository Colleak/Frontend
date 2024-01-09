import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, Button } from 'react-native';
import Auth0 from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingComponent from "./src/components/LoadingComponents";
import * as Font from 'expo-font';

const auth0 = new Auth0({
    domain: 'dev-lohb1xoklmc7vqfg.us.auth0.com',
    clientId: '1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC'
});

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function loadFontsAsync() {
            await Font.loadAsync({
                'TTCommonsMedium': require('./src/assets/fonts/TTCommons-Medium.ttf'),
            });
            setFontsLoaded(true);
        }

        loadFontsAsync();
    }, []);

    const login = () => {
        auth0.webAuth
            .authorize({ scope: 'openid profile email' })
            .then(credentials => {
                // Successfully authenticated
                setIsAuthenticated(true);
                console.log(credentials);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (!isAuthenticated) {
            login();
        }
    }, [isAuthenticated]);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                {!fontsLoaded /* || !isAuthenticated */ ? (
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
