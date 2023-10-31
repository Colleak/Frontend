import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CategoryHeaderProps = {
    label: string;
};

const SettingsSwitch: React.FC<CategoryHeaderProps> = ({ label}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.categoryText}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginTop: 2,

    },
    categoryText: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'TTCommonsMedium',
        color: 'blue',
    },
});

export default SettingsSwitch;
