import React, { useState, useEffect } from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppData from '../../AppData.json';

// Function to asynchronously fetch the current user's ID from AsyncStorage.
async function getCurrentUserId() {
    try {
        const userId = await AsyncStorage.getItem('currentUserId');
        return userId || 'default-user-id'; // Return a default or placeholder ID if not found.
    } catch (error) {
        // Check if error is an instance of Error and log the message.
        if (error instanceof Error) {
            console.error('Error fetching user ID from AsyncStorage:', error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return 'default-user-id'; // Return a default or placeholder ID in case of error.
    }
}

const StatusButton = () => {
    const [isOnLocation, setIsOnLocation] = useState(false);

    useEffect(() => {
        fetchStatus();
    }, []);

    const apiRequest = async (endpoint: string, userId: string) => {
        const url = `${AppData.serverAddress}${endpoint}`;
        const data = {sender_id: userId};

        console.log(`Sending request to URL: ${url}`);
        console.log(`Request body: ${JSON.stringify(data)}`);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            // Check if error is an instance of Error and log the message.
            if (error instanceof Error) {
                console.error('API request failed:', error.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
            throw error;
        }
    };

    const fetchStatus = async () => {
        try {
            const userId = await getCurrentUserId();
            const response = await apiRequest('Office/on_location', userId);
            setIsOnLocation(response.message); // Assuming 'message' is a boolean
            console.log('Fetched status:', response);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error during fetch:', error.message);
            } else {
                console.error('An unexpected error occurred during fetch:', error);
            }
        }
    };

    const updateStatus = async () => {
        try {
            const userId = await getCurrentUserId();
            const response = await apiRequest('/Office/set_location', userId);
            setIsOnLocation(response.message === "You are on location");
            console.log('Response:', response);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error during update:', error.message);
            } else {
                console.error('An unexpected error occurred during update:', error);
            }
        }
    };

    const onClick = () => {
        updateStatus();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Working from home
            </Text>
            <Switch
                trackColor={{false: "#575757", true: "blue"}}
                ios_backgroundColor={"#ffffff"}
                onValueChange={onClick}
                value={!isOnLocation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    label: {
        fontSize: 16,
        color: '#000'
    },
});

export default StatusButton;
