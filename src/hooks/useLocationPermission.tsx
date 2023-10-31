import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocationPermission = () => {
    const [permissionForLocation, setPermissionForLocation] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLocationPermission = async () => {
            try {
                const value = await AsyncStorage.getItem('locationPermission');
                if (value !== null) {
                    setPermissionForLocation(JSON.parse(value));
                } else {
                    askForLocationPermissionAlert();
                }
            } catch (error) {
                console.error('Error loading location permission', error);
            }
        };

        const askForLocationPermissionAlert = () => {
            Alert.alert(
                'Location Permission Needed',
                'This app needs your location permission, in order to show you the map of the office.',
                [
                    {
                        text: 'Yes',
                        onPress: () => updateLocationPermission(true),
                    },
                    {
                        text: 'No',
                        onPress: () => updateLocationPermission(false),
                    },
                ],
                { cancelable: false }
            );
        };

        const updateLocationPermission = async (value: boolean) => {
            try {
                await AsyncStorage.setItem('locationPermission', JSON.stringify(value));
                setPermissionForLocation(value);
            } catch (error) {
                console.error('Error saving location permission', error);
            }
        };

        checkLocationPermission();
    }, []);

    return permissionForLocation;
};

export default useLocationPermission;