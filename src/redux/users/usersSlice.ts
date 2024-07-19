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
