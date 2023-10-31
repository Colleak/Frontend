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

interface Location {
    [key: string]: {
        x: number;
        y: number;
    };
}

interface EmployeeListProps {
    updateMarkerCoords: (coords: { x: number; y: number }) => void;
  }

class EmployeeList extends Component<EmployeeListProps> {
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
        previousLocation: null,
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

    locations: Location[] = [
        {
            "EHV-AP-04-02": {
                "x": 400,
                "y": 400
            }
        },
        {
            "EHV-AP-04-03": {
                "x": 800,
                "y": 400
            }
        },
        {
            "EHV-AP-04-04": {
                "x": 400,
                "y": 800
            }
        }];

    findRouter = (filteredEmployees: {
        id: string;
        name: string;
        router: string;
        actions: {
            ping: () => void;
            call: () => void;
            message: () => void;
        };
    }[]) => {
        console.log(filteredEmployees);   

        if (filteredEmployees.length === 1) {
            const employee = filteredEmployees[0];
            const location = this.locations.find(loc => loc[employee.router]);
            if (location) {
                const coordinates = location[employee.router];
                this.props.updateMarkerCoords(coordinates);
            }
        }
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

        this.findRouter(filteredEmployees);

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
        width: '100%',
        height: '50%',
        paddingLeft: '2%',
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 30,
        paddingHorizontal: 10,
        width: '98%',
        paddingLeft: 15,
    },
    employeeList: {
        width: '98%',
        backgroundColor: 'white',
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    loadingContainer: {
        width: '98%',
        backgroundColor: 'white',
        marginTop: 10,
        paddingTop: "25%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
});

export default EmployeeList;
