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
    const [isMarkerVisible, setIsMarkerVisible] = useState(false);
        const [markerCoords, setMarkerCoords] = useState({ x: 0, y: 830 });
        const [sidebarVisible, setSidebarVisible] = useState(false);
    const permissionForLocation = useLocationPermission();
    const [userLoaded, setUserLoaded] = useState(false);

        const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const updateMarkerCoords = useCallback((newCoords: { x: number; y: number }) => {
        if (newCoords.x !== markerCoords.x || newCoords.y !== markerCoords.y) {
            setMarkerCoords(newCoords);
        }
    }, [markerCoords, setMarkerCoords]);
    const getFloorFromRouterLocation = (routerLocation: string) => {
        const floorNumber = parseInt(routerLocation.split('-')[1]);
        return floorNumber;
    };

    const routerLocation = "EHV-00-03"; // replace this with actual router location
    const floorNumber = getFloorFromRouterLocation(routerLocation);

    const floorPlanImages: { [key: number]: any } = {
        0: require('../../assets/images/colleak2dfloorplan0.png'),
        1: require('../../assets/images/colleak2dfloorplan1.png'),
        2: require('../../assets/images/colleak2dfloorplan2.png'),
        3: require('../../assets/images/colleak2dfloorplan3.png'),
        4: require('../../assets/images/colleak2dfloorplan4.png'),
        5: require('../../assets/images/colleak2dfloorplan5.png'),
    };

    const mapSource = floorPlanImages[floorNumber];
    const floor = `floor ${floorNumber}`;

    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={toggleSidebar}
                    logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            {sidebarVisible && <SideBar navigation={navigation} onClose={toggleSidebar} currentScreen={"Home"} />}
            <View style={styles.mapContainer}>
                <FloorText floor={floor}/>
                <CustomMap
                    mapSource={mapSource}
                    markerSource={require("../../assets/images/man.png")}
                    markerCoords={markerCoords}
                    isMarkerVisible={isMarkerVisible}
                />
            </View>
            <EmployeeList updateMarkerCoords={updateMarkerCoords} setIsMarkerVisible={setIsMarkerVisible} navigation = {navigation}/>
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
