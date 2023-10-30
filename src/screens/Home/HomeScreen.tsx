import {StyleSheet, View, Text, Alert, Switch} from 'react-native';
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
              //TODO update the user info when pressed. using an api update.
              
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
      //TODO add a fetch to see if the user wants to share their location. if yes dont show the Alert (if statement maybe)
    askForLocationPermissionAlert();
  }, []);
  return (
    <View style={styles.container}>

      <NavBar logoSource={require("../../assets/images/ioLogoBlue.png")} />
      
      <View style={styles.mapContainer}>
        <CustomMap
          mapSource={require("../../assets/images/colleak2dfloorplan.png")}
          markerSource={require("../../assets/images/wifi-signal-marker.png")}
          markerCoords={{ x: 830, y: 620 }}
        />
        <Text style={styles.floorText}>{floor}</Text>
      </View>
      <View style={styles.permission}>
        <Text style={styles.permissionItem}>
          {permissionForLocation
            ? "Location permission granted!"
            : "Location permission denied! "}
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#575757", true: "#66b8ff" }}
          ios_backgroundColor={"#ffffff"}
          onValueChange={setPermissionForLocation}
                //TODO update the user info when pressed. using an api update.
                //TODO Also need to make sure the db getsupdate to false if slider says false
          value={permissionForLocation}
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
    floorText: {
        fontSize: 30,
        fontFamily: 'TTCommonsMedium',
        color: 'white',
        position: 'absolute',
        top: "8%",
        left: "4%",
        textTransform: 'uppercase',
    },
    permission: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        marginBottom: 10,
    },
    permissionItem: {
        marginLeft: 10,
        color: 'white',
    },
    switch: {
        marginLeft: 10,
        color: 'white',
        position: 'absolute',
        right: 0,
    }

});

export default HomeScreen;
