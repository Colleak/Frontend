import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EmployeeListItem from "./EmployeeListItem";
import getApp from "../data/ApiAccess";
import LoadingComponent from "./LoadingComponents";
import AsyncStorage from '@react-native-async-storage/async-storage';

type EmployeeListState = {
    employees: {
        id: string;
        name: string;
        router: string;

        actions: {
            ping: () => void;
            call: () => void;
            message: () => void;
        };
    }[] | null;
};

class EmployeeList extends Component<{}, EmployeeListState> {
    state: EmployeeListState = {
        employees: null,
    };

    componentDidMount() {
        getApp().then(employeeData => {
            if (Array.isArray(employeeData)) {
                const transformedData = employeeData.map(employee => ({
                    id: employee.id.toString(), // Convert id to string
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

    render() {
        const { employees } = this.state;

        this.createCurrentUser();
        this.readCurrentUser();

        if (!employees) {
            return (
                <ScrollView style={styles.loadingContainer}>
                    <LoadingComponent/>
                </ScrollView>
            );
        }

        return (
            <ScrollView style={styles.employeeList}>
                {employees.map(employee => (
                    <EmployeeListItem
                        key={employee.id}
                        employee={employee}
                    />
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
