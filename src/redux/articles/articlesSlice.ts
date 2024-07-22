/**
 * @file articlesSlice.ts
 * 
 * Redux slice for managing articles in the application. This slice uses Redux Toolkit's `createSlice` and `createAsyncThunk` to handle asynchronous actions related to articles.
 * 
 * The slice includes:
 * - Thunks for fetching, creating, updating, publishing, unpublishing, deleting, and incrementing views of articles.
 * - Reducers for handling the state of articles, including loading states and errors.
 * - Types for the state and data structures used in article operations.
 * 
 * The `extraReducers` handle the lifecycle of the asynchronous thunks (pending, fulfilled, rejected) and update the Redux state accordingly.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllArticlesApi,
  fetchArticleByIdApi,
  readerFetchArticleByIdApi,
  addArticleApi,
  publishArticleApi,
  unpublishArticleApi,
  deleteArticleApi,
  updateArticleById,
  incrementArticleViewsApi
} from "./articlesApi";

// Thunk for fetching all articles
export const getAllArticles = createAsyncThunk(
  "articles/getAllArticles",
  async ({
    emailAccountId,
    blogId,
  }: {
    emailAccountId: number;
    blogId: number;
  }) => {
    const articles = await fetchAllArticlesApi(emailAccountId, blogId);
    return articles;
  }
);

// Thunk for fetching a single article by ID
export const getArticleById = createAsyncThunk(
  "articles/getArticleById",
  async ({
    emailAccountId,
    blogId,
    articleId,
  }: {
    emailAccountId: number;
    blogId: number;
    articleId: number;
  }) => {
    const article = await fetchArticleByIdApi(
      emailAccountId,
      blogId,
      articleId
    );
    return article;
  }
);

// Thunk for fetching an article by ID for readers
export const getReaderArticleById = createAsyncThunk(
  "articles/getReaderArticleById",
  async ({
    emailAccountId,
    blogId,
    articleId,
  }: {
    emailAccountId: number;
    blogId: number;
    articleId: number;
  }) => {
    const article = await readerFetchArticleByIdApi(
      emailAccountId,
      blogId,
      articleId
    );
    return article;
  }
);

// Thunk for adding a new article
export const addArticle = createAsyncThunk(
  "articles/createArticle",
  async ({
    emailAccountId,
    blogId,
    articleCreateDto,
  }: {
    emailAccountId: number;
    blogId: number;
    articleCreateDto: ArticleCreateDto;
  }) => {
    const article = await addArticleApi(emailAccountId, blogId, articleCreateDto);
    return article;
  }
);

// Thunk for publishing an article
export const publishArticle = createAsyncThunk(
  "articles/publishArticle",
  async ({
    emailAccountId,
    blogId,
    articleId,
  }: {
    emailAccountId: number;
    blogId: number;
    articleId: number;
  }) => {
    const publishedArticle = publishArticleApi(
      emailAccountId,
      blogId,
      articleId
    );
    return publishedArticle;
  }
);

// Thunk for unpublishing an article
export const unpublishArticle = createAsyncThunk(
  "articles/unpublishArticle",
  async ({
    emailAccountId,
    blogId,
    articleId,
  }: {
    emailAccountId: number;
    blogId: number;
    articleId: number;
  }) => {
    const publishedArticle = unpublishArticleApi(
      emailAccountId,
      blogId,
      articleId
    );
    return publishedArticle;
  }
);

// Thunk for deleting an article
export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async ({
    emailAccountId,
    blogId,
    articleId,
  }: {
    emailAccountId: number;
    blogId: number;
    articleId: number;
  }) => {
    await deleteArticleApi(emailAccountId, blogId, articleId);
    return { emailAccountId, blogId, articleId };
  }
);

// Thunk for updating an article
export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({
    emailAccountId,
    blogId,
    articleId,
    articleUpdateDto,
  }: {
    emailAccountId: number;
    blogId: number;
    articleId: number;
    articleUpdateDto: ArticleUpdateDto;
  }) => {
    const updatedArticle = await updateArticleById(
      emailAccountId,
      blogId,
      articleId,
      articleUpdateDto
    );
    return updatedArticle;
  }
);

// Thunk for incrementing article views count
export const incrementArticleViews = createAsyncThunk(
  "articles/incrementArticleViews",
  async ({ emailAccountId, blogId, articleId }: { emailAccountId: number; blogId: number; articleId: number }) => {
    await incrementArticleViewsApi(emailAccountId, blogId, articleId);
    return { emailAccountId, blogId, articleId };
  }
);

// Types for the article data and state management
type ArticleUpdateDto = {
  articleTitle: string;
  articleAuthor: string;
  content: string;
};

type ArticleCreateDto = {
  articleTitle: string;
  articleAuthor: string;
  articleStatus: string;
  content: string;
};

type ArticleDto = {
  articleId: number;
  articleTitle: string;
  articleAuthor: string;
  articleStatus: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  publishedTimestamp: string;
  articleViewsCount: string;
  content: string;
};

type ArticlesState = {
  articles: any[];
  article: ArticleDto | null;
  loading: boolean;
  error: string | null;
  adding: boolean;
  addError: string | null;
};

// Initial state for the articles slice
const initialState: ArticlesState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
  adding: false,
  addError: null,
};

// Redux slice for articles
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.articles = [];
    },
    clearArticle: (state) => {
      state.article = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch articles";
      })

      .addCase(getArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch article";
      })

      .addCase(getReaderArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReaderArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(getReaderArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch article";
      })

      .addCase(addArticle.pending, (state) => {
        state.adding = true;
        state.addError = null;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.adding = false;
        state.articles.push(action.payload);
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.adding = false;
        state.addError = action.error.message || "Failed to add blog";
      })

      .addCase(publishArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to publish an article";
      })

      .addCase(unpublishArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unpublishArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unpublishArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to unpublish an article";
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update blog';
      })

      .addCase(incrementArticleViews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(incrementArticleViews.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(incrementArticleViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to increment article views";
      });
  },
});

export const { clearArticles, clearArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
