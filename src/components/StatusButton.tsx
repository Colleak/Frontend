import React, { useState } from 'react';
import { Button } from 'react-native';
import mockData from '../data/MockApiAccess';

const StatusButton = () => {
    const [isOnLocation, setIsOnLocation] = useState(false);

    const onClick = async () => {
        const newStatus = !isOnLocation;
        console.log('Current status:', isOnLocation);
        console.log('New status to be sent:', newStatus);
        setIsOnLocation(newStatus);

        try {
            const response = await mockData(newStatus);
            console.log('Response:', response);
        } catch (error) {
            if (error instanceof TypeError) {
                console.error('TypeError during fetch:', error.message);
            } else if (error instanceof Error) {
                console.error('Error during fetch:', error.message);
            } else {
                console.error('Unknown error during fetch:', error);
            }
        }
    };

    return (
        <Button
            onPress={onClick}
            title={isOnLocation ? "On location" : "At home"}
        />
    );
}

export default StatusButton;
