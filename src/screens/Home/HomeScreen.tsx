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
interface Employee {
    id: string;
    connectedRouterName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [isMarkerVisible, setIsMarkerVisible] = useState(false);
    const [markerCoords, setMarkerCoords] = useState({x: -1000, y: 0});
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const permissionForLocation = useLocationPermission();
    const [userLoaded, setUserLoaded] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedRouter, setSelectedRouter] = useState<string | null>(null);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const updateMarkerCoords = useCallback((newCoords: { x: number; y: number }) => {
        if (newCoords.x !== markerCoords.x || newCoords.y !== markerCoords.y) {
            setMarkerCoords(newCoords);
        }
    }, [markerCoords, setMarkerCoords]);

    const getFloorFromRouterLocation = (routerLocation: string) => {
        const floorNumber = parseInt(routerLocation.split('-')[2]);
        console.log('floornumber:', floorNumber, selectedEmployee?.connectedRouterName)
        return floorNumber;
    };

    const routerLocation = selectedEmployee ? selectedEmployee.connectedRouterName: "EHV-AP-00-01";
    const floorNumber = getFloorFromRouterLocation(routerLocation);
    const floorPlanImages: { [key: number]: any } = {
        0: require('../../assets/images/colleak2dfloorplan0.png'),
        1: require('../../assets/images/colleak2dfloorplan1.png'),
        2: require('../../assets/images/colleak2dfloorplan2.png'),
        3: require('../../assets/images/colleak2dfloorplan3.png'),
        4: require('../../assets/images/colleak2dfloorplan4.png'),
        5: require('../../assets/images/colleak2dfloorplan5.png'),
    };

    const routerLocations: { [key: string]: { x: number; y: number } } = {
        "EHV-AP-00-01": {x: 539 - 75, y: -75 + 616}, //bar
        "EHV-AP-00-02": {x: 1058 - 75, y: -75 + 393}, //Rechts boven (boven de horizontale werkplekken)
        "EHV-AP-00-03": {x: 1461 - 75, y: -75 + 393}, //Rechts boven bij zithoek
        "EHV-AP-00-04": {x: 456 - 75, y: -75 + 818}, //Kantine
        "EHV-AP-00-05": {x: 1455 - 75, y: -75 + 576}, //Rechts in ruimte tussen de buitenplaats en de meeting rooms
        "EHV-AP-00-06": {x: 1483 - 75, y: -75 + 982}, //Rechts (boven werkplekken naast balie)
        "EHV-AP-00-07": {x: 929 - 75, y: -75 + 982}, //Rechts (balie)
        "EHV-AP-01-01": {x: 1464 - 75, y: -75 + 625}, //1e verdieping rechts
        "EHV-AP-01-02": {x: 900 - 75, y: -75 + 670}, //1e verdieping links na ingang
        "EHV-AP-01-03": {x: 233 - 75, y: -75 + 613}, //1e verdieping einde verdieping links
        "EHV-AP-02-01": {x: 1367 - 75, y: -75 + 612}, //2e verdieping rechts
        "EHV-AP-03-01": {x: 1476 - 75, y: -75 + 385}, //3e verdieping rechts aan de kant van Stern
        "EHV-AP-03-02": {x: 242 - 75, y: -75 + 611}, //3e verdieping links
        "EHV-AP-03-03": {x: 1476 - 75, y: -75 + 833}, //3e verdieping rechts aan de kant van Brock
        "EHV-AP-04-01": {x: 1461 - 75, y: -75 + 626}, //4e verdieping rechts
        "EHV-AP-04-02": {x: 351 - 75, y: -75 + 615}, //4e verdieping links
        "EHV-AP-05-01": {x: 1545 - 75, y: -75 + 646}, //5e verdieping rechts
        "EHV-AP-05-02": {x: 950 - 75, y: -75 + 681}, //5e verdieping midden
        "EHV-AP-05-03": {x: 343 - 75, y: -75 + 620}, //5e verdieping links
    };


    const mapSource = floorPlanImages[floorNumber];
    const floor = `floor ${floorNumber}`;

    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={toggleSidebar}
                    logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            {sidebarVisible && <SideBar navigation={navigation} onClose={toggleSidebar} currentScreen={"Home"}/>}
            <View style={styles.mapContainer}>
                <FloorText floor={floor}/>
                <CustomMap
                    mapSource={mapSource}
                    markerSource={require("../../assets/images/man.png")}
                    markerCoords={markerCoords}
                    isMarkerVisible={true}
                />
            </View>
            <EmployeeList
                updateMarkerCoords={updateMarkerCoords}
                setIsMarkerVisible={setIsMarkerVisible}
                navigation={navigation}
                onEmployeeSelect={(employee: Employee) => {
                    setSelectedRouter(employee.connectedRouterName);
                    setSelectedEmployee(employee);
                    if (routerLocations[employee.connectedRouterName]) {
                        setMarkerCoords(routerLocations[employee.connectedRouterName]);
                    }
                }}
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