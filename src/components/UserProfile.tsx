import Auth0 from 'react-native-auth0';
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

/* const domain = process.env.AUTH0_DOMAIN || '';
const clientId = process.env.AUTH0_CLIENT_ID || '';

const auth0 = new Auth0({ domain, clientId }); */

const auth0 = new Auth0({
    domain: 'dev-lohb1xoklmc7vqfg.us.auth0.com',
    clientId: '1DEAvHt6GnbL0VApHfpYZgbuVAu0VqdC'
});

interface UserInfo {
    name?: string;
}

const UserProfile = () => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                const credentials = await auth0.webAuth.authorize({ scope: 'openid profile email' });
                if (credentials.accessToken) {
                    const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
                    setUser(userInfo);
                }
            } catch (err: any) {
                setError(err);
            }
        };

        authenticateUser();
    }, []);

    return (
        <>
            {user && <Text>Logged in as {user.name}</Text>}
            {!user && <Text>Not logged in</Text>}
            {error && <Text>Error: {error.message}</Text>}
        </>
    );
}

export default UserProfile;
