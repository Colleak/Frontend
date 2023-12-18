import AppData from "../../AppData.json";
import MockMessage from "../models/user/mockEmployee";

const ListItemStatus = {
  postATMAvailable: async (data: MockMessage): Promise<void> => {
    const endpoint = 'available';
    const url = `${AppData.mockAddress}/${endpoint}`;

    const content = JSON.stringify(data);
    console.log('Pre try' + content)
    try {
      console.log('Pre fetch')
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: content,
      });

      if (!response.ok) {
        console.log('Response not ok')
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('result equals' + result)

      return result;
      
    } catch (error) {
      console.error('Error posting ATM availability:', error);
      throw error;
    }
  },
};

export default ListItemStatus;