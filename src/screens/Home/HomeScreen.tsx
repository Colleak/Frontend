import { StyleSheet, View, Text, Button } from 'react-native';

type HomeScreenProps = {
    navigation: any;
}

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
});

export default HomeScreen;