import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Text, Button } from 'react-native';
import Auth0 from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingComponent from "./src/components/LoadingComponents";
import * as Font from 'expo-font';
import { Alert } from 'react-native';
import { NetworkInfo } from "react-native-network-info";

//delete messages
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Failed prop type', 'There was a problem sending log message']);
console.warn = () => {}
window.onunhandledrejection = () => {};



const auth0 = new Auth0({
    domain: 'dev-lohb1xoklmc7vqfg.us.auth0.com',
    clientId: '1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC'
});

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [expoipv4, setExpoipv4] = useState("");

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


    useEffect(() => {
       const login = async () => {
    try {
        const authResult = await auth0.webAuth.authorize({scope: 'openid profile email'});
        setIsAuthenticated(true); // Set authenticated state on successful login

        // Get the user's profile information
        const userInfo = await auth0.auth.userInfo({token: authResult.accessToken});

        // Get the user's name from the Auth0 profile
        const name = userInfo.name;
        console.log('name:', name);

        // Fetch IP from api.ipify.org
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            console.log('IP Address:', data);

            // Send a PUT request to the specified address
            const putResponse = await fetch(`https://colleak-back-end.azurewebsites.net/api/Employees/employee/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({employeeName: name, ip: data.ip}) //change hardcoded to dynamic (data.ip vgm)
            });

            // Log the response to the console
            console.log('PUT Response:', putResponse);

            if (!putResponse.ok) {
                throw new Error('PUT request failed');
                console.log('PUT Response:', putResponse);
            }

        } catch (networkError) {
            console.log('Error fetching IP address:', networkError);
        }

    } catch (authError) {
        console.log('Authentication error:', authError);
    }
};

        if (!isAuthenticated) {
            login();
        }
    }, [isAuthenticated]);

    // Render
    return (
        <View style={{flex: 1}}>
            <StatusBar barStyle="dark-content"/>
            <Text style={{position: 'absolute', top: 0, zIndex: 1}}>{expoipv4}</Text>
            <NavigationContainer>
                {!fontsLoaded || !isAuthenticated ? (
                    <LoadingComponent/>
                ) : (
                    <RootNavigator/>
                )}
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({

});