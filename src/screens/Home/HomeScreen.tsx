import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import React from "react";
import CustomMap from "./components/CustomMap";
import EmployeeListItem from "../../components/EmployeeListItem";

type HomeScreenProps = {
    navigation: any;
}

const employees = [
    { name: "John Doe", actions: { ping: 'Ping John', call: 'Call John', message: 'Message John' } },
    { name: "Jane Doe", actions: { ping: 'Ping Jane', call: 'Call Jane', message: 'Message Jane' } },
    { name: "John Smith", actions: { ping: 'Ping John', call: 'Call John', message: 'Message John' } },
    { name: "Jane Smith", actions: { ping: 'Ping Jane', call: 'Call Jane', message: 'Message Jane' } },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', {
                    itemId: 86,
                    otherParam: 'anything you want here',
                })}
            />
            <View style={styles.mapContainer}>
                <CustomMap
                    mapSource={require("../../assets/images/penguinmapblue.png")}
                    markerSource={require("../../assets/images/tempmarker.jpg")}
                    markerCoords={{ x: 0, y: 0 }}
                />
            </View>
            <ScrollView style={styles.employeeList}>
                {employees.map((employee, index) => (
                    <EmployeeListItem
                        key={index}
                        name={employee.name}
                        onPing={() => console.log(employee.actions.ping)}
                        onCall={() => console.log(employee.actions.call)}
                        onMessage={() => console.log(employee.actions.message)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "blue"
    },
    mapContainer: {
        width: '100%',
        height: '40%',
        backgroundColor: 'yellow',
    },
    employeeList: {
        height: '50%',
        width: '98%',
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 30,
        overflow: 'hidden',
    }
});

export default HomeScreen;