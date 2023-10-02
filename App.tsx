import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import LoadingComponent from "./src/components/LoadingComponents";

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

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

    if (!fontsLoaded) {
        return <LoadingComponent/>;
    }

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <NavigationContainer>
                <RootNavigator/>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({

});
