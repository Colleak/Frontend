
import {  View, ScrollView, StyleSheet,   Text} from 'react-native';
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppData from "../../../../AppData.json"
const Calendar: React.FC = () => {
    const currentUserId = "652551bdb82d091daccff161";
    const targetUserId = "652551bdb82d091daccff161";
    const message = "Hello world";


    const apiRequest = async (endpoint: string, method: string, data: object): Promise<any> => {
        const url = `${AppData.serverAddress}${endpoint}`;
        const requestBody = JSON.stringify(data);
        // Log the URL and the request body
        console.log(`Sending request to URL: ${url}`);
        console.log(`Request body: ${requestBody}`);

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            const responseJson = await response.json();
            console.log(`Response from ${url}:`, responseJson); // Log the response
            return responseJson;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    };

        const [lastSelectedEmployee, setLastSelectedEmployee] = useState<string>('');

    const [meetings, setMeetings] = useState(Array(24).fill(false));

    // Function to fetch the last selected employee from AsyncStorage
    const fetchLastSelectedEmployee = async () => {
        try {
            const savedEmployeeName = await AsyncStorage.getItem('lastSelectedEmployee');
            if (savedEmployeeName !== null) {
                setLastSelectedEmployee(savedEmployeeName);
            }
        } catch (error) {
            console.error('Failed to fetch from AsyncStorage:', error);
        }
    };

    fetchLastSelectedEmployee();

useEffect(() => {
    async function getArray() {
        try {
            let response = await apiRequest('Office/available', 'POST', { sender_id: currentUserId, receiver_id: targetUserId, message });
            let AvailableArray = response.AvailableArray;
            console.log(AvailableArray);
            return AvailableArray;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    getArray().then(endpointData => {
        const updatedMeetings = Array(24).fill(false);
        endpointData.forEach((index: number) => {
            if (index < updatedMeetings.length) {
                updatedMeetings[index] = true;
            }
        });
        setMeetings(updatedMeetings); // Update the state
    });
}, []);


    return (
        <ScrollView style={styles.scrollView}>
            {lastSelectedEmployee ? (
                <View style={styles.employeeNameView}>
                    <Text style={styles.employeeNameText}>Schedule: {lastSelectedEmployee}</Text>
                </View>
            ) :

                <View style={styles.employeeNameView}>
                    <Text style={styles.employeeNameText}>Schedule: Temp</Text>
                </View>
                }
            {meetings.map((isMeeting, index) => (
                <View key={index} style={isMeeting ? styles.activeHour : styles.hour}>
                    {/* Display time in half-hour increments */}
                    <Text style={isMeeting ? styles.text : styles.blackText}>
                        {8 + Math.floor(index / 2)}:{index % 2 === 0 ? '00' : '30'} {isMeeting ? 'Meeting' : ''}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    employeeNameView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        width: '100%',
    },
    employeeNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    hour: {
        backgroundColor: 'white',
        width: '100%',
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',

    },
    activeHour: {
        backgroundColor: 'blue',
        width: '100%',
        height: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 55, // IF change text change this !!!!!!!
    },
    text: {
        color: 'white',
    },
    blackText: {
        color: 'black',
    }

});

export default Calendar;
