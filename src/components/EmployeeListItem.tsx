import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Employee from '../models/user/Employees';
import ListItemStatus from './ListItemStatus'; 
import AppData from '../../AppData.json';

interface EmployeeListItemProps {
  employee: Employee;
  currentUserId: string;
  isFavorite: boolean;
  updateFavorites: (employeeId: string, isFavorite: boolean) => void;
  findRouter: () => void;
  selectEmployee: (employeeId: string) => void;
  isSelected: boolean;
  setMarkerVisibility: (isVisible: boolean) => void;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({
  employee,
  currentUserId,
  isFavorite,
  updateFavorites,
  findRouter,
  selectEmployee,
  isSelected,
  setMarkerVisibility,
}) => {
  const [statusColor, setStatusColor] = useState('');
  const [isAvailableBool, setIsAvailableBool] = useState(false);

  const handlePress = () => {
    findRouter();
    selectEmployee(employee.id);
    setMarkerVisibility(isAvailableBool);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('So far so good (pre API)');
        const statusResult = await ListItemStatus.postATMAvailable({
          sender_id: currentUserId,
          receiver_id: employee.id,
          receiver_name: employee.employeeName,
          request_time: 13
        });

        console.log('Status Result EQUALS ', statusResult);

        if (!JSON.stringify(statusResult).includes('not')) {
          setStatusColor('green');
          setIsAvailableBool(true);
        } else if (JSON.stringify(statusResult).includes('not')) {
          setStatusColor('red');
          setIsAvailableBool(false);
        } else {
          setStatusColor('black');
        }
      } catch (error) {
        console.error('Error getting status:', error);
        throw error;
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 15 * 60 * 1000); // interval time in milliseconds (15 minutes default)
    return () => clearInterval(intervalId);
  }, [currentUserId, employee.id, employee.employeeName]);

  const pingUser = (currentUserId: string, targetUserId: string): Promise<void> => {
    return apiRequest('Office/sendping', 'POST', { sender_id: currentUserId, receiver_id: targetUserId });
  };

  const callUser = (currentUserId: string, targetUserId: string): Promise<void> => {
    return apiRequest('Office/sendcall', 'POST', { sender_id: currentUserId, receiver_id: targetUserId });
  };

  const messageUser = (currentUserId: string, targetUserId: string, message: string): Promise<void> => {
    return apiRequest('Office/sendmessage', 'POST', { sender_id: currentUserId, receiver_id: targetUserId, message: message });
  };

  const apiRequest = async (endpoint: string, method: string, data: object): Promise<any> => {
    const url = `${AppData.serverAddress}${endpoint}`;
    const requestBody = JSON.stringify(data);

    console.log(`Sending request to URL: ${url}`);
    console.log(`Request body: ${requestBody}`);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const responseJson = await response.json();
      console.log(`Response from ${url}:`, responseJson);
      return responseJson;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  const handleFavoritePress = () => {
    updateFavorites(employee.id, !isFavorite);
  };

  const nameStyle = isSelected ? styles.selectedName : styles.name;

  return (
    <TouchableOpacity style={isSelected ? styles.selectedContainer : styles.container} onPress={handlePress} onLongPress={handleFavoritePress}>
      <View style={styles.nameWrapper}>
        <Text style={nameStyle}>
          {employee.employeeName}
          <Text style={{ color: statusColor }}> ◉</Text>
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => pingUser(currentUserId, employee.id)}>
            <Text style={styles.buttonText}>Ping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => callUser(currentUserId, employee.id)}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => messageUser(currentUserId, employee.id, 'Test message')}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
        <Ionicons
          name={isFavorite ? 'ios-star' : 'ios-star-outline'}
          size={25}
          color={isFavorite ? 'gold' : 'grey'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedContainer: {
    backgroundColor: 'blue',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameWrapper: {},
  name: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
    fontFamily: 'TTCommonsMedium',
    color: 'black', // Default color for the part before and after "status"
    letterSpacing: 2,
    marginLeft: '1%',
  },
  selectedName: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 5,
    fontFamily: 'TTCommonsMedium',
    color: 'white',
    letterSpacing: 2,
    marginLeft: '1%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    marginHorizontal: '1%',
  },
  selectedButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    marginHorizontal: '1%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'TTCommonsMedium',
    fontSize: 20,
  },
  selectedButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontFamily: 'TTCommonsMedium',
    fontSize: 20,
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
    paddingRight: 10,
  },
});

export default EmployeeListItem;
