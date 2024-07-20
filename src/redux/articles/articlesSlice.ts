import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllArticlesApi,
  fetchArticleByIdApi,
  publishArticleApi,
  unpublishArticleApi,
  deleteArticleApi,
  updateArticleById,
} from "./articlesApi";

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

type ArticleUpdateDto = {
  articleTitle: string;
  articleAuthor: string;
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

const initialState: ArticlesState = {
  articles: [],
  article: null,
  loading: false,
  error: null,
  adding: false,
  addError: null,
};

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
      });
  },
});

export const { clearArticles, clearArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
