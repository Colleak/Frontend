import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

type SettingsScreenProps = {
    navigation: any;
}
const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <NavBar onHamburgerPress={ }/>
                <SideBar navigation={ navigation }/>
            <Text style={styles.text}>Hello, World!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default SettingsScreen;