import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type EmployeeListItemProps = {
    name: string;
    onPing?: () => void;
    onCall?: () => void;
    onMessage?: () => void;
};

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ name, onPing, onCall, onMessage }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={onPing}>
                    <Text style={styles.buttonText}>Ping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onCall}>
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onMessage}>
                    <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    name: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EmployeeListItem;
