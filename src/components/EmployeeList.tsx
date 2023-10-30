import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
} from 'react-native';
import EmployeeListItem from "./EmployeeListItem";
import getApp from "../data/ApiAccess";
import LoadingComponent from "./LoadingComponents";
import AsyncStorage from '@react-native-async-storage/async-storage';

class EmployeeList extends Component {
    state = {
        employees: [] as {
            id: string;
            name: string;
            router: string;
            actions: {
                ping: () => void;
                call: () => void;
                message: () => void;
            };
        }[] | null,
        searchTerm: '',
    };

    componentDidMount() {
        getApp().then(employeeData => {
            if (Array.isArray(employeeData)) {
                const transformedData = employeeData.map(employee => ({
                    id: employee.id.toString(),
                    name: employee.employeeName,
                    router: employee.connectedRouterName,
                    actions: {
                        ping: () => console.log('Ping', employee.employeeName),
                        call: () => console.log('Call', employee.employeeName),
                        message: () => console.log('Message', employee.employeeName),
                    }
                }));
                this.setState({ employees: transformedData });
            } else {
                console.error("Failed to fetch employee data:", employeeData);
            }
        });
    }

   locations = [
    {"EHV-AP-04-02": {
        "x": 400,
        "y": 400
    }},
    {"EHV-AP-04-03": {
        "x": 800,
        "y": 400
    }},
    {"EHV-AP-04-04": {
        "x": 400,
        "y": 800
    }}];

    createCurrentUser = () => {
        const currentUser =
            {
                "x": 400,
                "y": 400
            }

        AsyncStorage.setItem("currentUserCoordinates", JSON.stringify(currentUser));
    }

    readCurrentUser = async () => {
        try {
          const coordinates = await AsyncStorage.getItem("currentUserCoordinates")
            if (coordinates) {
              const parsedCoordinates = JSON.parse(coordinates);
            }
        } catch (error) {
          return;
        }
      }
  
    handleSearch = (text: string) => {
        this.setState({ searchTerm: text });
    };

    render() {
        const { employees, searchTerm } = this.state;

        this.createCurrentUser();
        this.readCurrentUser();

        if (!employees) {
            return (
                <ScrollView style={styles.loadingContainer}>
                    <LoadingComponent />
                </ScrollView>
            );
        }

        const filteredEmployees = employees.filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.searchInput, { backgroundColor: 'white' }]}
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChangeText={this.handleSearch}
                />

                <ScrollView style={styles.employeeList}>
                    {filteredEmployees.map((employee) => (
                        <EmployeeListItem key={employee.id} employee={employee} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 30,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    employeeList: {
        height: '50%',
        width: '98%',
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 30,
        overflow: 'hidden',
    },
    loadingContainer: {
        height: '50%',
        width: '98%',
        backgroundColor: 'white',
        paddingTop: "25%",
        borderRadius: 30,
        overflow: 'hidden',
    },
});

export default EmployeeList;
