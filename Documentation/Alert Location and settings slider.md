# Alert when you enter the homescreen

We made a new feature that asks your permission to use your location when entering the homescreen. We do this so it can be send to the db later.

```typescript
import {StyleSheet, View, Text, Alert, Switch} from 'react-native';
const [permissionForLocation, setPermissionForLocation] = useState(false);
  const askForLocationPermissionAlert = () => {
    Alert.alert(
      "Location Permission Needed",
      "This app needs the location permission, in order to show you the map of the office.",
      [
        {
          text: "Yes",
          onPress: () => {
            setPermissionForLocation(true);
          },
        },
        {
          text: "No",
          onPress: () => {
            setPermissionForLocation(false);
          },
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    askForLocationPermissionAlert();
  }, []);
```

# Security settings slider

The slider is there so you can toggle your preferred security settings. The slider is made with the following code:

```typescript
      <View style={styles.permission}>
        <Text style={styles.permissionItem}>
          {permissionForLocation
            ? "Location permission granted!"
            : "Location permission denied! "}
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#575757", true: "#66b8ff" }}
          ios_backgroundColor={"#ffffff"}
          onValueChange={setPermissionForLocation}
          value={permissionForLocation}
        />
      </View>


    const styles = StyleSheet.create({
    permission: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        marginBottom: 10,
    },
    permissionItem: {
        marginLeft: 10,
        color: 'white',
    },
    switch: {
        marginLeft: 10,
        color: 'white',
        position: 'absolute',
        right: 0,
    }
    });

```