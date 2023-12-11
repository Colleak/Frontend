import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type NavBarProps = {
    onHamburgerPress?: () => void;
    logoSource?: any; // You can specify a more specific type if needed
};

const NavBar: React.FC<NavBarProps> = ({ onHamburgerPress, logoSource }) => {
    return (
        <View style={styles.navBar}>
            <Image source={logoSource} style={styles.logo} />
            <View style={styles.spacer} />
            <TouchableOpacity onPress={onHamburgerPress} style={styles.hamburgerButton}>
                <Text style={styles.hamburgerIcon}>☰</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: '10%',
        paddingHorizontal: 15,
        paddingTop: "10%",
        elevation: 3, // for shadow on Android
        shadowColor: '#000', // for shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    spacer: {
        flex: 1,
    },
    hamburgerButton: {
        padding: 10,
    },
    hamburgerIcon: {
        fontSize: 30,
        color: 'blue'
    },
});

export default NavBar;
