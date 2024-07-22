/**
 * @file usersApi.ts
 * 
 * This file contains API utility functions for managing users. It includes functions for fetching, adding, and retrieving user data.
 * 
 * The functions provided in this file include:
 * 
 * - `fetchAllUsers`: Retrieves a list of all users from the server.
 * - `fetchUserById`: Retrieves details of a specific user by their ID.
 * - `addUser`: Sends a request to add a new user to the server.
 * 
 * Each function interacts with the server's user-related endpoints using Axios for making HTTP requests.
 * 
 * Example usage:
 * 
 * ```typescript
 * import { fetchAllUsers, fetchUserById, addUser } from './usersApi';
 * 
 * // Fetch all users
 * const users = await fetchAllUsers();
 * 
 * // Fetch a single user by ID
 * const user = await fetchUserById(1);
 * 
 * // Add a new user
 * const newUser = await addUser({ name: 'John Doe', email: 'john.doe@example.com' });
 * ```
 */

import axios from 'axios';

const API_URL = 'http://localhost:5045/users';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const addUser = async (user: any) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
