The settings component contains the functionality for the user to login and change their status.


**location permission**

At the first use of the app, the user gets a prompt that asks if the application can use their location.
This is nescessary for the functionality of the application, and also legally required.

The application also asks this through the home page on the first use of the application. This is then stored in Asyncstorage and then retreived in the settings component.
```typescript
        const updateLocationPermission = async (value: boolean) => {
            try {
                await AsyncStorage.setItem('locationPermission', JSON.stringify(value));
                setPermissionForLocation(value);
            } catch (error) {
                console.error('Error saving location permission', error);
            }
        };
```

**login and user profile**

Here the user is given the option to login through Auth0, which afterwards displays the user profile.
The application can connect the logged in user to the connected ip-adress in the Router API.

**User status**

This button allows the user to change their status based on if they are working in the office or at-home. This status is send to the back-end where it is stored and get's switched when the button is pressed. When that status, is "at home" the users location is not displayed on the office map.