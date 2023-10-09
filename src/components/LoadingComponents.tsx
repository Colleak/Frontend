import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingComponent = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/ioLogoBlue.png')} style={styles.logo} />
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // or any other background color you prefer
    },
    logo: {
        marginBottom: 20,
        width: 100, // or your preferred width
        height: 100, // or your preferred height
        resizeMode: 'contain',
    },
});

export default LoadingComponent;