import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllBlogs, fetchBlogById, addBlog, deleteBlog, updateBlogById  } from './blogsApi';


export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async (emailAccountId: number) => {
  const blogs = await fetchAllBlogs(emailAccountId)
  return blogs;
});

export const getBlogById = createAsyncThunk('blog/getBlogById', async ({emailAccountId, blogId}: { emailAccountId: number, blogId: number }) => {
  const blog = await fetchBlogById(emailAccountId, blogId)
  return blog;
}); 

export const createBlog = createAsyncThunk('blogs/createBlog', async ({ emailAccountId, blogDto }: { emailAccountId: number, blogDto: BlogDto }) => {
  const blog = await addBlog(emailAccountId, blogDto);
  return blog;
});

export const deleteBlogById = createAsyncThunk('blogs/deleteBlogById',
  async ({ emailAccountId, blogId }: { emailAccountId: number, blogId: number }) => {
    await deleteBlog(emailAccountId, blogId);
    return { emailAccountId, blogId }; // Return necessary info for state updates
  }
);

export const updateBlog = createAsyncThunk('blog/updateBlog', async ({emailAccountId, blogId,blogDto}: { emailAccountId: number; blogId: number; blogDto: BlogDto }) => {
    const updatedBlog = await updateBlogById(emailAccountId, blogId, blogDto);
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
  blog: BlogDto | null,
  loading: boolean;
  error: string | null;
  adding: boolean;
  addError: string | null;
}

const initialState: BlogsState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
  adding: false,
  addError: null
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    })
    .addCase(getAllBlogs.rejected, (state, action) => {
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
      state.blogs = state.blogs.filter(blog => blog.blogId !== action.payload.blogId);
    })
    .addCase(deleteBlogById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete blog';
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
      state.error = action.error.message || 'Failed to update blog';
    });
  }
})

export default blogsSlice.reducer;