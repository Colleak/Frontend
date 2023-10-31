import React, { useState } from "react";
import { StyleSheet, View} from 'react-native';
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
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const permissionForLocation = useLocationPermission();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={toggleSidebar}
                    logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            {sidebarVisible && <SideBar navigation={navigation} onClose={toggleSidebar} currentScreen={"Home"} />}
            <View style={styles.mapContainer}>
                <FloorText floor={"floor 1"}/>
                <CustomMap
                    mapSource={require("../../assets/images/colleak2dfloorplan.png")}
                    markerSource={require("../../assets/images/wifi-signal-marker.png")}
                    markerCoords={{x: 830, y: 620}}
                />
            </View>
            <EmployeeList/>
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
