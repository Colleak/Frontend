import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EmployeeListItem from "./EmployeeListItem";
import getApp from "../data/ApiAccess";
import LoadingComponent from "./LoadingComponents";

type EmployeeListState = {
    employees: {
        id: string;
        name: string;
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

    render() {
        const { employees } = this.state;

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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
