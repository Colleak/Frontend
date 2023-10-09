import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type EmployeeListItemProps = {
    employee: {
        name: string;
        actions: {
            ping: () => void;
            call: () => void;
            message: () => void;
        };
    };
};

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{employee.name}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={employee.actions.ping}>
                    <Text style={styles.buttonText}>Ping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={employee.actions.call}>
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={employee.actions.message}>
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
        marginTop: '2%',
    },
    name: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'TTCommonsMedium',
        color: 'blue',
        letterSpacing: 2,
        marginLeft: '1%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        backgroundColor: 'blue',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'TTCommonsMedium',
        fontSize: 20,
    },
});


export default EmployeeListItem;
