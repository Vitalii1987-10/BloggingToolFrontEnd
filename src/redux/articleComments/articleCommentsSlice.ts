/**
 * This slice of the Redux store manages the state for article comments.
 * 
 * It handles the following functionalities:
 * 1. Adding a new comment to an article (`addComment`).
 * 2. Fetching comments for a specific article (`getComments`).
 * 3. Clearing the comments from the state (`clearComments`).
 * 
 * The slice manages the following state properties:
 * - `comments`: Array of comments for an article.
 * - `loading`: Boolean indicating if comments are being fetched.
 * - `error`: Error message if fetching comments fails.
 * - `adding`: Boolean indicating if a comment is being added.
 * - `addError`: Error message if adding a comment fails.
 * 
 * It uses `createAsyncThunk` for handling asynchronous actions related to comments and `createSlice`
 * for defining the slice of the state.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCommentApi, getCommentsApi } from "./articleCommentsApi";

// Interface for the structure of a comment
interface ArticleCommentDto {
  commentatorName: string;
  comment: string;
  createdTimestamp: Date;
}

// Interface for the state managed by this slice
interface ArticleCommentState {
  comments: ArticleCommentDto[];
  loading: boolean;
  error: string | null;
  adding: boolean;
  addError: string | null;
}

// Initial state of the slice
const initialState: ArticleCommentState = {
  comments: [],
  loading: false,
  error: null,
  adding: false,
  addError: null,
};

// Async thunk for adding a comment
export const addComment = createAsyncThunk(
  "article/addComment",
  async (
    {
      emailAccountId,
      blogId,
      articleId,
      articleCommentDto,
    }: { emailAccountId: number; blogId: number; articleId: number; articleCommentDto: ArticleCommentDto }
  ) => {
    const newComment = await addCommentApi(emailAccountId, blogId, articleId, articleCommentDto);
    return newComment;
  }
);

// Async thunk for fetching comments
export const getComments = createAsyncThunk(
  "article/getComments",
  async ({ emailAccountId, blogId, articleId }: { emailAccountId: number; blogId: number; articleId: number }) => {
    const comments = await getCommentsApi(emailAccountId, blogId, articleId);
    return comments;
  }
);

// Slice for article comments
const articleCommentsSlice = createSlice({
  name: "articleComments",
  initialState,
  reducers: {
    // Action to clear the comments from the state
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of adding a comment
      .addCase(addComment.pending, (state) => {
        state.adding = true;
        state.addError = null;
      })
      // Handle the fulfilled state of adding a comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.adding = false;
        state.comments.push(action.payload);
      })
      // Handle the rejected state of adding a comment
      .addCase(addComment.rejected, (state, action) => {
        state.adding = false;
        state.addError = action.error.message || "Failed to add comment";
      })
      // Handle the pending state of fetching comments
      .addCase(getComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state of fetching comments
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      // Handle the rejected state of fetching comments
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

// Export the action to clear comments
export const { clearComments } = articleCommentsSlice.actions;

// Export the reducer to be used in the store
export default articleCommentsSlice.reducer;
