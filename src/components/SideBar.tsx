import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

type SideBarProps = {
    navigation: any;
    onClose: () => void;
    currentScreen: string;
};

const SideBar: React.FC<SideBarProps> = ({ navigation, onClose, currentScreen}) => {
    const homePress = () => {
        navigation.navigate('Home')
        onClose();
    }
    const settingsPress = () => {
        navigation.navigate('Settings')
        onClose();
    }
    const meetingPress = () => {
        navigation.navigate('Meeting')
        onClose();
    }
    return (
        <View style={styles.sidebar}>
            <View style={styles.header}>
                <Image source={require("../assets/images/ioLogoWhite.png")} style={styles.logo}/>
            </View>
            <TouchableOpacity style={styles.item} onPress={homePress}>
                <Text style={styles.itemText}>
                    {currentScreen === 'Home' ? '● Home' : 'Home'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={settingsPress}>
                <Text style={styles.itemText}>
                    {currentScreen === 'Settings' ? '● Settings' : 'Settings'}
                </Text>
            </TouchableOpacity>
            {/* Add more items as needed
            <TouchableOpacity style={styles.item} onPress={meetingPress}>
                <Text style={styles.itemText}>
                    {currentScreen === 'Meeting' ? '● Meeting' : 'Meeting'}
                </Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '70%',
        height: '100%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000
    },
    header: {
        backgroundColor: 'blue',
        paddingLeft: 15,
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: "15%",
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    item: {
        height: '10%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        top: '50%',
        marginLeft: 20,
    },
    itemText: {
        fontSize: 30,
        fontFamily: 'TTCommonsMedium',
        color: 'blue',
        letterSpacing: 2,
        paddingLeft: 20,
    },
});

export default SideBar;
