import {StyleSheet, View as View, ScrollView, Text} from 'react-native';
import React, {useState, useEffect, useCallback} from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Calendar from "./Components/Calendar";

type MeetingScreenProps = {
    navigation: any;
}

const MeetingScreen: React.FC<MeetingScreenProps> = ({ navigation }) => {
        const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={toggleSidebar}
                    logoSource={require("../../assets/images/ioLogoBlue.png")}/>
            {sidebarVisible && <SideBar navigation={navigation} onClose={toggleSidebar} currentScreen={"Home"} />}

                <Calendar />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "white",
        width: '100%',
    },
    switch: {
        marginLeft: 10,
        color: 'white',
        position: 'absolute',
        right: 0,
    },
    scrollView: {

        width: '98%',
        backgroundColor: 'white',
        marginTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',

    },

});

export default MeetingScreen;