import Auth0 from 'react-native-auth0';
import {Button} from "react-native";

const auth0 = new Auth0({
    domain: 'dev-lohb1xoklmc7vqfg.us.auth0.com',
    clientId: '1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC'
});

const LoginButton = () => {
    const onPress = async () => {
        try {
            await auth0.webAuth.authorize({scope: 'openid profile email'});
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}

export default LoginButton;