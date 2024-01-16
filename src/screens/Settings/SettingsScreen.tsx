import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import SettingsSwitch from "./components/SettingsSwitch";
import CategoryHeader from "./components/CategoryHeader";
import LoginButton from "../../components/LoginButton";
import LogoutButton from "../../components/LogoutButton";
import UserProfile from "../../components/UserProfile";
import StatusButton from "../../components/StatusButton";



type SettingsScreenProps = {
    navigation: any;
}
const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handlePermissionToggle = (isEnabled: boolean) => {
        // TODO: Send update to API
    };
    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={toggleSidebar} logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            {sidebarVisible && <SideBar navigation={navigation} onClose={toggleSidebar} currentScreen={"Settings"}/>}
            <CategoryHeader label="Privacy"/>
            <SettingsSwitch
                settingKey="locationPermission"
                label="Location Permission"
                onToggle={handlePermissionToggle}
            />
            <StatusButton/>
            <LogoutButton/>
            {/*<UserProfile/>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    categoryText: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        marginTop: '1%',
        fontFamily: 'TTCommonsMedium',
        color: 'blue',
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
    },
});

export default SettingsScreen;