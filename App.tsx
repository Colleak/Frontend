import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import EmployeeComponent from './src/components/EmployeeComponent';

export default function App() {
  return (
 
      <NavigationContainer>
        <RootNavigator />

      </NavigationContainer>

   

      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
