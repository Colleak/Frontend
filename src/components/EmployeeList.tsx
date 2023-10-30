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

class EmployeeList extends Component {
    state = {
        employees: [] as {
            id: string;
            name: string;
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

    handleSearch = (text: string) => {
        this.setState({ searchTerm: text });
    };

    render() {
        const { employees, searchTerm } = this.state;

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
