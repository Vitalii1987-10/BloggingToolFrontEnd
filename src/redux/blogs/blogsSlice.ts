/**
 * @file blogsSlice.ts
 * 
 * Redux slice for managing blog-related state in the application. This file defines the state structure, actions, and asynchronous thunks for handling blog operations.
 * 
 * The slice includes:
 * - `authorGetAllblogs`: Async thunk for fetching all blogs authored by a specific email account.
 * - `readerGetAllblogs`: Async thunk for fetching all blogs available to a specific email account.
 * - `getBlogById`: Async thunk for fetching a specific blog by its ID.
 * - `createBlog`: Async thunk for creating a new blog.
 * - `deleteBlogById`: Async thunk for deleting a blog by its ID.
 * - `updateBlog`: Async thunk for updating a specific blog by its ID.
 * 
 * The state includes:
 * - `blogs`: List of blogs authored by the current user.
 * - `readerBlogs`: List of blogs available to the current user.
 * - `blog`: The currently selected blog for detailed view or editing.
 * - `loading`: Boolean flag indicating if a request is in progress.
 * - `error`: Error message if a request fails.
 * - `adding`: Boolean flag indicating if a blog is being added.
 * - `addError`: Error message if adding a blog fails.
 * 
 * The slice handles different states of asynchronous actions, including pending, fulfilled, and rejected states, updating the Redux state accordingly.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  authorGetAllBlogsApi,
  readerGetAllBlogsApi,
  fetchBlogByIdApi,
  addBlogApi,
  deleteBlogApi,
  updateBlogByIdApi,
} from "./blogsApi";

export const authorGetAllblogs = createAsyncThunk(
  "blogs/authorGetAllBlogs",
  async (emailAccountId: number) => {
    const blogs = await authorGetAllBlogsApi(emailAccountId);
    return blogs;
  }
);

export const readerGetAllblogs = createAsyncThunk(
  "blogs/readerGetAllBlogs",
  async (emailAccountId: number) => {
    const blogs = await readerGetAllBlogsApi(emailAccountId);
    return blogs;
  }
);

export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async ({
    emailAccountId,
    blogId,
  }: {
    emailAccountId: number;
    blogId: number;
  }) => {
    const blog = await fetchBlogByIdApi(emailAccountId, blogId);
    return blog;
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async ({
    emailAccountId,
    blogDto,
  }: {
    emailAccountId: number;
    blogDto: BlogDto;
  }) => {
    const blog = await addBlogApi(emailAccountId, blogDto);
    return blog;
  }
);

export const deleteBlogById = createAsyncThunk(
  "blogs/deleteBlogById",
  async ({
    emailAccountId,
    blogId,
  }: {
    emailAccountId: number;
    blogId: number;
  }) => {
    await deleteBlogApi(emailAccountId, blogId);
    return { emailAccountId, blogId };
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({
    emailAccountId,
    blogId,
    blogDto,
  }: {
    emailAccountId: number;
    blogId: number;
    blogDto: BlogDto;
  }) => {
    const updatedBlog = await updateBlogByIdApi(
      emailAccountId,
      blogId,
      blogDto
    );
    return updatedBlog;
  }
);

type BlogDto = {
  blogTitle: string;
  blogAuthor: string;
  blogCategory: string;
};

type BlogsState = {
  blogs: any[];
  readerBlogs: any[];
  blog: BlogDto | null;
  loading: boolean;
  error: string | null;
  adding: boolean;
  addError: string | null;
};

const initialState: BlogsState = {
  blogs: [],
  readerBlogs: [],
  blog: null,
  loading: false,
  error: null,
  adding: false,
  addError: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogs: (state) => {
      state.blogs = [];
    },
    clearBlog: (state) => {
      state.blog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorGetAllblogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authorGetAllblogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(authorGetAllblogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      })

      .addCase(readerGetAllblogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readerGetAllblogs.fulfilled, (state, action) => {
        state.loading = false;
        state.readerBlogs = action.payload;
      })
      .addCase(readerGetAllblogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      })

      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch a blog";
      })

      .addCase(createBlog.pending, (state) => {
        state.adding = true;
        state.addError = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.adding = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.adding = false;
        state.addError = action.error.message || "Failed to add blog";
      })

      .addCase(deleteBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(
          (blog) => blog.blogId !== action.payload.blogId
        );
      })
      .addCase(deleteBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete blog";
      })

      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update blog";
      });
  },
});

export const { clearBlogs, clearBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
