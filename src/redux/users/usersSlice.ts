/**
 * @file usersSlice.ts
 * 
 * This file defines the Redux slice for managing user-related state. It includes actions and reducers for handling
 * asynchronous operations related to users, such as fetching user data and adding a new user.
 * 
 * The following async actions are provided:
 * 
 * - `getAllUsers`: Fetches all users from the API and updates the state with the retrieved user list.
 * - `getUserById`: Fetches a specific user by their ID from the API and updates the state with the retrieved user data.
 * - `createUser`: Adds a new user via the API and updates the state with the newly created user.
 * 
 * The slice maintains the following state:
 * 
 * - `users`: An array of user objects.
 * - `loading`: A boolean indicating whether a request is in progress.
 * - `error`: A string for any error messages encountered during requests.
 * 
 * Example usage:
 * 
 * ```typescript
 * import { useSelector, useDispatch } from 'react-redux';
 * import { getAllUsers, createUser } from './usersSlice';
 * 
 * const dispatch = useDispatch();
 * const users = useSelector((state) => state.users.users);
 * 
 * useEffect(() => {
 *   dispatch(getAllUsers());
 * }, [dispatch]);
 * 
 * const handleAddUser = (user) => {
 *   dispatch(createUser(user));
 * };
 * ```
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllUsers, fetchUserById, addUser } from './usersApi';

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const users = await fetchAllUsers();
  return users;
});

export const getUserById = createAsyncThunk('users/getUserById', async (id: number) => {
  const user = await fetchUserById(id);
  return user;
});

export const createUser = createAsyncThunk('users/createUser', async (user: any) => {
  const newUser = await addUser(user);
  return newUser;
});

type UsersState = {
  users: any[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      });
  },
});

export default usersSlice.reducer;
