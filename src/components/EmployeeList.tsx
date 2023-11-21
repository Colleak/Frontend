import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmployeeListItem from "./EmployeeListItem";
import getApp from "../data/ApiAccess";
import LoadingComponent from "./LoadingComponents";

interface Location {
    [key: string]: {
        x: number;
        y: number;
    };
}

interface Employee {
    id: string;
    name: string;
    router: string;
    actions: {
        ping: () => void;
        call: () => void;
        message: () => void;
    };
}

interface EmployeeListProps {
    updateMarkerCoords: (coords: { x: number; y: number }) => void;
}

interface EmployeeListState {
    employees: Employee[] | null;
    searchTerm: string;
    favorites: string[];
    selectedEmployeeId: string | null;
}

class EmployeeList extends Component<EmployeeListProps, EmployeeListState> {
    state: EmployeeListState = {
        employees: null,
        searchTerm: '',
        favorites: [],
        selectedEmployeeId: null,
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
        this.fetchFavorites(); // Fetch favorites from AsyncStorage
    }

    fetchFavorites = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            this.setState({ favorites: favorites ? favorites.split(',') : [] });
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        }
    }

    updateFavorites = async (employeeId: string, isFavorite: boolean) => {
        try {
            let { favorites } = this.state;
            const index = favorites.indexOf(employeeId);

            if (isFavorite && index === -1) {
                favorites.push(employeeId);
            } else if (!isFavorite && index !== -1) {
                favorites.splice(index, 1);
            }

            await AsyncStorage.setItem('favorites', favorites.join(','));
            this.setState({ favorites });
        } catch (error) {
            console.error("Failed to update favorites:", error);
        }
    }

    locations: Location[] = [
        {   "EHV-AP-04-02": { "x": 400, "y": 400}   },
        {   "EHV-AP-04-03": { "x": 800, "y": 400}   },
        {   "EHV-AP-04-04": { "x": 400, "y": 800}   },
    ];

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

    selectEmployee = (employeeId: string) => {
        this.setState({ selectedEmployeeId: employeeId });
    };

    handleSearch = (text: string) => {
        this.setState({ searchTerm: text });
    };

    render() {
        const { employees, searchTerm, favorites } = this.state;

        if (!employees) {
            return (
                <ScrollView style={styles.loadingContainer}>
                    <LoadingComponent />
                </ScrollView>
            );
        }

        let filteredEmployees = employees.filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort employees so that favorites are at the top
        filteredEmployees.sort((a, b) => {
            // Check if either employee is favorite
            const aIsFavorite = favorites.includes(a.id);
            const bIsFavorite = favorites.includes(b.id);
            if (aIsFavorite && !bIsFavorite) return -1;
            if (!aIsFavorite && bIsFavorite) return 1;

            // If both are favorites or both are not, then sort alphabetically by full name
            return a.name.localeCompare(b.name);
        });

        // If there is only one employee after filtering, find and update router location
        if (filteredEmployees.length === 1) {
            this.findRouter(filteredEmployees);
        }

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
                        <EmployeeListItem
                            key={employee.id}
                            employee={employee}
                            isFavorite={favorites.includes(employee.id)}
                            updateFavorites={this.updateFavorites}
                            findRouter={() => this.findRouter([employee])} //click to show location functionality
                            selectEmployee={this.selectEmployee}
                            isSelected={this.state.selectedEmployeeId === employee.id}

                        />
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
