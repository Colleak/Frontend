import {StyleSheet, View, Text} from 'react-native';
import React from "react";
import CustomMap from "./components/CustomMap";
import EmployeeList from "../../components/EmployeeList";
import NavBar from "../../components/NavBar";

type HomeScreenProps = {
    navigation: any;
}

const floor = "Floor 1";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NavBar logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            <View style={styles.mapContainer}>
                <CustomMap
                    mapSource={require("../../assets/images/penguinmapblue.png")}
                    markerSource={require("../../assets/images/wifi-signal-marker.png")}
                    markerCoords={{ x: 0, y: 830 }}
                />
                <Text style={styles.floorText}>{floor}</Text>
            </View>
            <EmployeeList />
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
    floorText: {
        fontSize: 30,
        fontFamily: 'TTCommonsMedium',
        color: 'white',
        position: 'absolute',
        top: "8%",
        left: "4%",
        textTransform: 'uppercase',
    }
});

export default HomeScreen;
