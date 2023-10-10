import {StyleSheet, View, Text, Alert} from 'react-native';
import React, {useState, useEffect} from "react";
import CustomMap from "./components/CustomMap";
import EmployeeList from "../../components/EmployeeList";
import NavBar from "../../components/NavBar";

type HomeScreenProps = {
    navigation: any;
}

const floor = "Floor 1";


const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  
  const [permissionForLocation, setPermissionForLocation] = useState(false);
  const askForLocationPermissionAlert = () => {
    Alert.alert(
      "Location Permission Needed",
      "This app needs the location permission, in order to show you the map of the office.",
      [
        {
          text: "Yes",
          onPress: () => {
            setPermissionForLocation(true);
          },
        },
        {
          text: "No",
          onPress: () => {
            setPermissionForLocation(false);
          },
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    askForLocationPermissionAlert();
  }, []);
  return (
    <View style={styles.container}>
      <NavBar logoSource={require("../../assets/images/ioLogoBlue.png")} />
      <Text>
        {permissionForLocation
          ? "Location permission granted!"
          : "Location permission denied!"}
      </Text>
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
