import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

type RootStackParamList = {
    Home: undefined;
    Settings: undefined;
    // Add other screens as needed, added an example below this line :)
    //Details: {
    //    itemId: number;
    //    otherParam?: string;
    //};
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Home' }} />
            {/* Add other Stack.Screen components as needed for other screens */}
        </Stack.Navigator>
    );
};

export default RootNavigator;