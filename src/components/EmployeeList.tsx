import React, { Component } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmployeeListItem from "./EmployeeListItem";
import getApp from "../data/ApiAccess";
import LoadingComponent from "./LoadingComponents";
import Employee from "../models/user/Employees";

interface Location {
    [key: string]: {
        x: number;
        y: number;
    };
}

interface EmployeeListProps {
    updateMarkerCoords: (coords: { x: number; y: number }) => void;
    setIsMarkerVisible: (isVisible: boolean) => void
}

interface EmployeeListState {
    employees: Employee[] | null;
    searchTerm: string;
    favorites: string[];
    selectedEmployeeId: string | null;
    isOnLocation: boolean;
}

class EmployeeList extends Component<EmployeeListProps, EmployeeListState> {
    state: EmployeeListState = {
        employees: null,
        searchTerm: '',
        favorites: [],
        selectedEmployeeId: null,
        isOnLocation: true,
    };

    componentDidMount() {
        getApp().then(employeeData => {
            if (Array.isArray(employeeData)) {
                this.setState({ employees: employeeData });
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
        { "EHV-AP-04-02": { "x": 400, "y": 400 } },
        { "EHV-AP-04-03": { "x": 800, "y": 400 } },
        { "EHV-AP-04-04": { "x": 400, "y": 800 } },
    ];

    findRouter = (employee: Employee) => {
        const location = this.locations.find(loc => loc[employee.connectedRouterName]);
        if (location) {
            const coordinates = location[employee.connectedRouterName];
            if (this.state.isOnLocation) {
                this.props.updateMarkerCoords(coordinates);
            }
        }
    }

    setMarkerVisibility = (isVisible: boolean) => {
        this.props.setIsMarkerVisible(isVisible);
    };

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
            employee.employeeName && employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort employees so that favorites are at the top
        filteredEmployees.sort((a, b) => {
            const aIsFavorite = favorites.includes(a.id);
            const bIsFavorite = favorites.includes(b.id);
            if (aIsFavorite && !bIsFavorite) return -1;
            if (!aIsFavorite && bIsFavorite) return 1;
            return a.employeeName.localeCompare(b.employeeName);
        });

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
                            currentUserId={'652551bdb82d091daccff161'} //temporary, change to async value later
                            isFavorite={favorites.includes(employee.id)}
                            updateFavorites={this.updateFavorites}
                            findRouter={() => this.findRouter(employee)} //click to show location functionality
                            selectEmployee={this.selectEmployee}
                            isSelected={this.state.selectedEmployeeId === employee.id}
                            setMarkerVisibility={this.setMarkerVisibility}
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
