import React, { useEffect, useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsSwitchProps = {
    settingKey: string;
    label: string;
    onToggle?: (isEnabled: boolean) => void;
};

const SettingsSwitch: React.FC<SettingsSwitchProps> = ({ settingKey, label, onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const loadSetting = async () => {
            try {
                const value = await AsyncStorage.getItem(settingKey);
                if (value !== null) {
                    setIsEnabled(JSON.parse(value));
                }
            } catch (error) {
                console.error('Error loading setting', error);
            }
        };

        loadSetting();
    }, [settingKey]);

    const toggleSwitch = async () => {
        try {
            const newValue = !isEnabled;
            setIsEnabled(newValue);
            await AsyncStorage.setItem(settingKey, JSON.stringify(newValue));
            if (onToggle) {
                onToggle(newValue);
            }
        } catch (error) {
            console.error('Error saving setting', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>
            <Switch
                trackColor={{ false: "#575757", true: "blue" }}
                ios_backgroundColor={"#ffffff"}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

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

export default SettingsSwitch;
