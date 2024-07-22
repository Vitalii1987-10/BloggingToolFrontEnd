/**
 * This module contains API functions for managing articles in a blog application.
 * 
 * The functions perform various operations related to articles, including:
 * 
 * 1. Fetching all articles for a specific blog (`fetchAllArticlesApi`).
 * 2. Fetching a specific article by its ID (`fetchArticleByIdApi` and `readerFetchArticleByIdApi`).
 * 3. Publishing and unpublishing articles (`publishArticleApi` and `unpublishArticleApi`).
 * 4. Adding a new article (`addArticleApi`).
 * 5. Incrementing the view count of an article (`incrementArticleViewsApi`).
 * 6. Deleting an article (`deleteArticleApi`).
 * 7. Updating an article (`updateArticleById`).
 * 
 * Each function handles errors appropriately and provides console messages for different error scenarios.
 */

import axios from "axios";

const API_URL = "http://localhost:5045/user";

// Interface for the structure of an article
interface ArticleDto {
  articleTitle: string;
  articleAuthor: string;
  content: string;
}

// Fetches all articles for a specific blog
export const fetchAllArticlesApi = async (emailAccountId: number, blogId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${emailAccountId}/blog/${blogId}/articles`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.clear();
        console.warn(`No articles found for emailAccountId ${emailAccountId} and blogId ${blogId}`);
        return [];
      }
    }
    console.error("Failed to fetch articles:", error);
    throw error;
  }
};

// Fetches a specific article by its ID
export const fetchArticleByIdApi = async(emailAccountId: number, blogId: number, articleId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.clear();
        console.warn(`No article found for emailAccountId ${emailAccountId}, blogId ${blogId} and articleId ${articleId}`);
        return [];
      }
    }
    console.error("Failed to fetch article:", error);
    throw error;
  }
}

// Fetches a specific reader article by its ID
export const readerFetchArticleByIdApi = async(emailAccountId: number, blogId: number, articleId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${emailAccountId}/blog/${blogId}/reader-article/${articleId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.clear();
        console.warn(`No reader-article found for emailAccountId ${emailAccountId}, blogId ${blogId} and articleId ${articleId}`);
        return [];
      }
    }
    console.error("Failed to fetch reader-article:", error);
    throw error;
  }
}

// Publishes an article
export const publishArticleApi = async(emailAccountId: number, blogId: number, articleId: number) => {
  try {
    const response = await axios.put(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/publish`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error publishing article:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
}

// Unpublishes an article and moves it to drafts
export const unpublishArticleApi = async(emailAccountId: number, blogId: number, articleId: number) => {
  try {
    const response = await axios.put(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/to-drafts`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error unpublishing article:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
}

// Adds a new article
export const addArticleApi = async (emailAccountId: number, blogId: number, ArticleDto: ArticleDto) => {
  try {
    const response = await axios.post(`${API_URL}/${emailAccountId}/blog/${blogId}/add-article`, {
      emailAccountId,
      blogId,
      ...ArticleDto,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          console.warn("Bad request:", error.response.data);
        } else if (error.response.status === 500) {
          console.error("Server error:", error.response.data);
        }
      } else {
        console.error("Error adding article:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Increments the view count of an article
export const incrementArticleViewsApi = async (emailAccountId: number, blogId: number, articleId: number) => {
  try {
    const response = await axios.post(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/increment-views`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          console.warn(`Failed to increment views for articleId ${articleId}`);
        } else {
          console.error("Error incrementing article views:", error.response.data);
        }
      } else {
        console.error("Error incrementing article views:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Deletes an article
export const deleteArticleApi = async(emailAccountId: number, blogId: number, articleId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/delete-article`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting article:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
}

// Updates an article
export const updateArticleById = async(emailAccountId: number, blogId: number, articleId: number, ArticleDto: ArticleDto) => {
  try {
    const response = await axios.put(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/update-article`, ArticleDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error updating article:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
}
