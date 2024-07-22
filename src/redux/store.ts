import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageSlice';
import usersReducer from './users/usersSlice';
import blogsReducer from "./blogs/blogsSlice"
import articlesReducer from "./articles/articlesSlice"
import articleCommentsReducer from "./articleComments/articleCommentsSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    users: usersReducer,
    blogs: blogsReducer,
    articles: articlesReducer,
    articleComments: articleCommentsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
