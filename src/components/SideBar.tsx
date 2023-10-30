import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type SideBarProps = {
    navigation: any;
};

const SideBar: React.FC<SideBarProps> = ({ navigation }) => {
    const homePress = () => {
        navigation.navigate('Home')
    }
    const settingsPress = () => {
        navigation.navigate('Settings')
    }
    return (
        <View style={styles.sidebar}>
            <Text style={styles.header}>Menu</Text>
            <TouchableOpacity style={styles.item} onPress={homePress}>
                <Text style={styles.itemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={settingsPress}>
                <Text style={styles.itemText}>Settings</Text>
            </TouchableOpacity>
            {/* Add more items as needed */}
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
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
});

export default SideBar;
