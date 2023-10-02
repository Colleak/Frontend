import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import { LatLng, LeafletView, MapLayerType } from 'react-native-leaflet-view';
import EmployeeComponent from '../../components/EmployeeComponent';
type HomeScreenProps = {
    navigation: any;
}

const DEFAULT_COORDINATE: LatLng = {
    lat: 0.500,
    lng: 0.500,
};

// Define the bounds for your custom image
const IMAGE_BOUNDS = [
    [0, 1.920], // top-left corner
    [1.080, 0] // bottom-right corner
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details', {
                    itemId: 86,
                    otherParam: 'anything you want here',
                })}
            />
            <EmployeeComponent />

            {/* <LeafletView
                mapMarkers={[
                    {
                        position: DEFAULT_COORDINATE,
                        icon: '📍',
                        size: [32, 32],
                    },
                    {
                        position: [0.500, 0.600],
                        icon: '📍',
                        size: [32, 32],
                    },
                    {
                        position: [0.560, 0.670],
                        icon: '📍',
                        size: [32, 32],
                    },
                ]}
                mapLayers={[
                    {
                        layerType: MapLayerType.IMAGE_LAYER,
                        url: 'https://clubpenguinmountains.com/wp-content/uploads/2014/05/screenshot_13.png', // Replace with the URL of your custom image
                        bounds: IMAGE_BOUNDS,
                    }
                ]}
                mapCenterPosition={DEFAULT_COORDINATE}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
