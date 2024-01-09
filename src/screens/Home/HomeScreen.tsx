import {StyleSheet, View, Text, Alert, Switch} from 'react-native';
import React, {useState, useEffect, useCallback} from "react";
import CustomMap from "./components/CustomMap";
import FloorText from "./components/FloorText";
import EmployeeList from "../../components/EmployeeList";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { useLocationPermission } from "../../hooks";

type HomeScreenProps = {
    navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [isMarkerVisible, setIsMarkerVisible] = useState(true);
        const [markerCoords, setMarkerCoords] = useState({ x: 0, y: 830 });
        const [sidebarVisible, setSidebarVisible] = useState(false);
    const permissionForLocation = useLocationPermission();
    const [userLoaded, setUserLoaded] = useState(false);
    const [selectedRouterName, setSelectedRouterName] = useState("EHV-AP-01-01");

    const getFloorNumber = (routerName: string) => {
        if (!routerName) {
            return "1";
        }
        const parts = routerName.split("-");
        return parts[2];
    };
    const getRouterNumber = (routerName: string) => {
        const parts = routerName.split("-");
        return parts[3];
    };

    const floorNumber = getFloorNumber(selectedRouterName);

    const handleSelectEmployee = useCallback((connectedRouterName: string) => {
        setSelectedRouterName(connectedRouterName);
        const newCoords = routerLocations[getRouterNumber(connectedRouterName)];
        if (newCoords) {
            setMarkerCoords(newCoords);
        }
    }, [setSelectedRouterName, setMarkerCoords ]);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const updateMarkerCoords = useCallback((newCoords: { x: number; y: number }) => {
        if (newCoords.x !== markerCoords.x || newCoords.y !== markerCoords.y) {
            setMarkerCoords(newCoords);
        }
    }, [markerCoords, setMarkerCoords]);

    const floorImages: { [key: number]: any } = {
        1: require('../../assets/images/colleak2dfloorplan1.png'),
        2: require('../../assets/images/colleak2dfloorplan2.png'),
        3: require('../../assets/images/colleak2dfloorplan3.png'),
        4: require('../../assets/images/colleak2dfloorplan4.png'),
    };

    const routerLocations: { [key: string]: { x: number; y: number } } = {
        "01": { x: 1520, y: 400 }, // Top right
        "02": { x: 1520, y: 780 }, // Bottom right
        "03": { x: 300, y: 780 }, // Bottom left
        "04": { x: 300, y: 400 }, // Top left
    };

    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={toggleSidebar}
                    logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            {sidebarVisible && <SideBar navigation={navigation} onClose={toggleSidebar} currentScreen={"Home"} />}
            <View style={styles.mapContainer}>
                <FloorText floor={`floor ${floorNumber}`}/>
                <CustomMap
                    mapSource={floorImages[Number(floorNumber)]}
                    markerSource={require("../../assets/images/man.png")}
                    markerCoords={markerCoords}
                    isMarkerVisible={isMarkerVisible}
                />
            </View>
            <EmployeeList
                updateMarkerCoords={updateMarkerCoords}
                setIsMarkerVisible={setIsMarkerVisible}
                onSelectEmployee={handleSelectEmployee}
                navigation={navigation}
                routerLocations={routerLocations}
                getRouterNumber={getRouterNumber}
            />
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
    },
    switch: {
        marginLeft: 10,
        color: 'white',
        position: 'absolute',
        right: 0,
    }

});

export default HomeScreen;
