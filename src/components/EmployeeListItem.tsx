import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmployeeActions {
    ping: () => void;
    call: () => void;
    message: () => void;
}

interface Employee {
    id: string;
    name: string;
    actions: EmployeeActions;
}

interface EmployeeListItemProps {
    employee: Employee;
    isFavorite: boolean;
    updateFavorites: (employeeId: string, isFavorite: boolean) => void;
    findRouter: () => void;
    selectEmployee: (employeeId: string) => void;
    isSelected: boolean;

}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee, isFavorite, updateFavorites,
                                                               findRouter, selectEmployee, isSelected,}) => {
    const handlePress = () => {
        findRouter();
        selectEmployee(employee.id);
    };

    const containerStyle = isSelected ? styles.selectedContainer : styles.container;
    const nameStyle = isSelected ? styles.selectedName : styles.name;
    const buttonStyle = isSelected ? styles.selectedButton : styles.button;
    const buttonText = isSelected ? styles.selectedButtonText : styles.buttonText;

    const handleFavoritePress = () => {
        updateFavorites(employee.id, !isFavorite);
    };

    return (
        <TouchableOpacity style={containerStyle} onPress={handlePress} onLongPress={handleFavoritePress}>
            <View style={styles.nameWrapper}>
                <Text style={nameStyle}>{employee.name}</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={buttonStyle} onPress={employee.actions.ping}>
                        <Text style={buttonText}>Ping</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={buttonStyle} onPress={employee.actions.call}>
                        <Text style={buttonText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={buttonStyle} onPress={employee.actions.message}>
                        <Text style={buttonText}>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
                <Ionicons name={isFavorite ? "ios-star" : "ios-star-outline"} size={25} color={isFavorite ? "gold" : "grey"} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedContainer: {
        backgroundColor: 'blue',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameWrapper: {

    },
    name: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 5,
        fontFamily: 'TTCommonsMedium',
        color: 'blue',
        letterSpacing: 2,
        marginLeft: '1%',
    },
    selectedName: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 5,
        fontFamily: 'TTCommonsMedium',
        color: 'white',
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
    selectedButton: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'TTCommonsMedium',
        fontSize: 20,
    },
    selectedButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        fontFamily: 'TTCommonsMedium',
        fontSize: 20,
    },
    favoriteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 4,
        paddingRight: 10,
    },
});


export default EmployeeListItem;
