import React, { useState } from 'react';
import { Image, View, ScrollView, StyleSheet, LayoutChangeEvent } from 'react-native';

interface CustomMap2Props {
    mapSource: any; // Source of the 1920x1080 map image
    markerSource: any; // Source of the marker image
    markerCoords: { x: number; y: number }; // Coordinates for the marker on a 1920 x 1080 image
}

const CustomMap: React.FC<CustomMap2Props> = ({ mapSource, markerSource, markerCoords }) => {
    const [scaleFactor, setScaleFactor] = useState(1);
    const onLayout = (event: LayoutChangeEvent) => {
        const containerHeight = event.nativeEvent.layout.height;
        const imageOriginalHeight = 1080;
        setScaleFactor(containerHeight / imageOriginalHeight);
    };

    return (
        <ScrollView horizontal style={styles.container} onLayout={onLayout}>
            <Image source={mapSource} style={styles.mapImage} resizeMode="contain" />
            <View
                style={[
                    styles.markerContainer,
                    {
                        left: markerCoords.x * scaleFactor,
                        top: markerCoords.y * scaleFactor,
                        width: 100 * scaleFactor,
                        height: 100 * scaleFactor,
                    },
                ]}
            >
                <Image source={markerSource} style={styles.markerImage} resizeMode="contain" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: "100%",
    },
    mapImage: {
        flex: 1,
        width: undefined, // Let the layout engine determine the width
        height: undefined, // Let the layout engine determine the height
        aspectRatio: 1920 / 1080, // Maintain the aspect ratio
    },
    markerContainer: {
        position: 'absolute',
    },
    markerImage: {
        width: '100%', // Adjust the width and height as needed
        height: '100%',
    },
});

export default CustomMap;
