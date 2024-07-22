/**
 * @file blogsApi.ts
 * 
 * API service functions for managing blogs in the application. This file contains functions for making HTTP requests to the backend server to handle various blog-related operations.
 * 
 * The functions include:
 * - `authorGetAllBlogsApi`: Fetches all blogs for a specific author based on their email account ID.
 * - `readerGetAllBlogsApi`: Fetches all blogs for a specific reader based on their email account ID.
 * - `fetchBlogByIdApi`: Fetches a single blog by its ID.
 * - `addBlogApi`: Adds a new blog using the provided blog details.
 * - `deleteBlogApi`: Deletes a specific blog by its ID.
 * - `updateBlogByIdApi`: Updates a specific blog by its ID with new details.
 * 
 * Each function handles errors and logs appropriate messages to the console, including specific cases for 404 (not found) and 500 (server error) responses.
 */

import axios from "axios";

const API_URL = "http://localhost:5045/user";

interface BlogDto {
  blogTitle: string;
  blogAuthor: string;
  blogCategory: string;
}

/**
 * Fetches all blogs for a specific author based on their email account ID.
 * 
 * @param emailAccountId - The ID of the email account for which to fetch blogs.
 * @returns An array of blogs if successful, or an empty array if no blogs are found.
 * @throws Will throw an error if the request fails.
 */
export const authorGetAllBlogsApi = async (emailAccountId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${emailAccountId}/authorGetAllBlogs`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.clear();
        console.warn(`No blogs found for emailAccountId ${emailAccountId}`);
        return [];
      }
    }
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

/**
 * Fetches all blogs for a specific reader based on their email account ID.
 * 
 * @param emailAccountId - The ID of the email account for which to fetch blogs.
 * @returns An array of blogs if successful, or an empty array if no blogs are found.
 * @throws Will throw an error if the request fails.
 */
export const readerGetAllBlogsApi = async (emailAccountId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${emailAccountId}/readerGetAllBlogs`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.clear();
        console.warn(`No blogs found for emailAccountId ${emailAccountId}`);
        return [];
      }
    }
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

/**
 * Fetches a single blog by its ID.
 * 
 * @param emailAccountId - The ID of the email account to which the blog belongs.
 * @param blogId - The ID of the blog to fetch.
 * @returns The blog data if successful, or an empty array if the blog is not found.
 * @throws Will throw an error if the request fails.
 */
export const fetchBlogByIdApi = async (emailAccountId: number, blogId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/${emailAccountId}/blog/${blogId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.clear();
        console.warn(`No blog found for emailAccountId ${emailAccountId}`);
        return [];
      }
    }
    console.error("Failed to fetch blog:", error);
    throw error;
  }
};

/**
 * Adds a new blog using the provided blog details.
 * 
 * @param emailAccountId - The ID of the email account to which the blog belongs.
 * @param blogDto - The details of the blog to be added.
 * @returns The added blog data if successful.
 * @throws Will throw an error if the request fails.
 */
export const addBlogApi = async (emailAccountId: number, blogDto: BlogDto) => {
  try {
    const response = await axios.post(`${API_URL}/${emailAccountId}/add-blog`, {
      emailAccountId,
      ...blogDto,
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
        console.error("Error adding blog:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Deletes a specific blog by its ID.
 * 
 * @param emailAccountId - The ID of the email account to which the blog belongs.
 * @param blogId - The ID of the blog to be deleted.
 * @returns The response data if successful.
 * @throws Will throw an error if the request fails.
 */
export const deleteBlogApi = async (emailAccountId: number, blogId: number) => {
  try {
    const response = await axios.delete(
      `${API_URL}/${emailAccountId}/delete-blog/${blogId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting blog:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
};

/**
 * Updates a specific blog by its ID with new details.
 * 
 * @param emailAccountId - The ID of the email account to which the blog belongs.
 * @param blogId - The ID of the blog to be updated.
 * @param blogDto - The new details of the blog.
 * @returns The updated blog data if successful.
 * @throws Will throw an error if the request fails.
 */
export const updateBlogByIdApi = async (emailAccountId: number, blogId: number, blogDto: BlogDto) => {
  try {
    const response = await axios.put(`${API_URL}/${emailAccountId}/update-blog/${blogId}`, blogDto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error updating blog:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; 
  }
};