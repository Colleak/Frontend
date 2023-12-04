# Favourite other employees

We made a new feature that allows you to add other employees to favourite there coworkers to the top of the list.

```typescript
interface EmployeeListItemProps {
    employee: Employee;
    isFavorite: boolean;
    updateFavorites: (employeeId: string, isFavorite: boolean) => void;
    findRouter: () => void;
    selectEmployee: (employeeId: string) => void;
    isSelected: boolean;

}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee, isFavorite, updateFavorites,
                                                               findRouter, selectEmployee, isSelected,}) => {
    const handlePress = () => {
        findRouter();
        selectEmployee(employee.id);
    };
    
    const handleFavoritePress = () => {
        updateFavorites(employee.id, !isFavorite);
    };

    return (
        // The rest of the code
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
            <Ionicons name={isFavorite ? "ios-star" : "ios-star-outline"} size={25} color={isFavorite ? "gold" : "grey"} />
        </TouchableOpacity>
    );
};

export default EmployeeListItem;

```

# Login

We implemented auth0 to log in using microsoft accounts.

```typescript
const LoginButton = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}

export default LoginButton;
```

```typescript
const LogoutButton = () => {
    const {clearSession} = useAuth0();

    const onPress = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}

export default LogoutButton;
```

```typescript
const Profile = () => {
    const {user, error} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.name}</Text>}
    {!user && <Text>Not logged in</Text>}
        {error && <Text>{error.message}</Text>}
        </>
        )
        }

        export default Profile;
```