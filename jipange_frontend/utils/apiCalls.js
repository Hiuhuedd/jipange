import axios from 'axios';
import { BASE_URL } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AddGoal API call function
export const addGoal = async (title, description, deadline, priority, userId) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/goals`, {
      userId,
      title,
      description,
     
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; // Return the data after the API call
  } catch (error) {
    console.error('Error adding goal:', error);
    throw error; // Throw the error to handle it in the UI
  }
};
// AddGoal API call function
export const addTask = async (title, goalId) => {

  try {
    const response = await axios.post(`${BASE_URL}/api/tasks`, {
      goalId,
      title,

     
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; // Return the data after the API call
  } catch (error) {
    console.error('Error adding goal:', error);
    throw error; // Throw the error to handle it in the UI
  }
};
//FetchGoal API call function
export const fetchGoal = async (userId) => {

  try {
    const response = await axios.get(`${BASE_URL}/api/goals/${userId}`, {
      
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; // Return the data after the API call
  } catch (error) {
    console.error('Errorfetching goal:', error);
    throw error; // Throw the error to handle it in the UI
  }
};
export const fetchTask = async (goalId) => {

  try {
    const response = await axios.get(`${BASE_URL}/api/tasks/${goalId}`, {
      
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; // Return the data after the API call
  } catch (error) {
    console.error('Errorfetching goal:', error);
    throw error; // Throw the error to handle it in the UI
  }
};
export const removeTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete taskl:', error);
    throw error;
  }
};
export const removeGoal = async (goalId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/goals/${goalId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete goal:', error);
    throw error;
  }
};

// UpdateTaskCompletion API call function
export const updateTaskCompletion = async (taskId, completed) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/tasks/${taskId}`, {
      completed, // Send the completed status (true/false)
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data; // Return the updated task data
  } catch (error) {
    console.error('Error updating task completion:', error);
    throw error; // Throw the error to handle it in the UI
  }
};
