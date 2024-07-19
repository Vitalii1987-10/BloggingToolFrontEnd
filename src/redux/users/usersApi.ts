import axios from 'axios';

const API_URL = 'http://localhost:5045/users';

export const fetchAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchUserById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addUser = async (user: any) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
