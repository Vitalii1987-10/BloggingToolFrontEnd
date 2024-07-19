import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import usersReducer from './users/usersSlice';
import blogsReducer from "./blogs/blogsSlice"

export const store = configureStore({
  reducer: {
    page: pageReducer,
    users: usersReducer,
    blogs: blogsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
