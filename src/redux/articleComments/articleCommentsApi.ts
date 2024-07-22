/**
 * This module defines functions for interacting with the article comments API.
 * 
 * It provides functionalities for:
 * 1. Adding a comment to a specific article (`addCommentApi`).
 * 2. Fetching all comments for a specific article (`getCommentsApi`).
 * 
 * Both functions handle API requests and manage errors that might occur during the requests.
 */


import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5045/user";

// Interface for the data structure of an article comment
interface ArticleCommentDto {
  commentatorName: string;
  comment: string;
  createdTimestamp: Date;
}

/**
 * Adds a comment to a specific article.
 * 
 * @param emailAccountId - ID of the email account associated with the user.
 * @param blogId - ID of the blog where the article resides.
 * @param articleId - ID of the article to which the comment is added.
 * @param articleCommentDto - Data transfer object containing the comment details.
 * @returns The response data from the API if successful.
 * @throws An error if the API request fails.
 */
export const addCommentApi = async (
  emailAccountId: number,
  blogId: number,
  articleId: number,
  articleCommentDto: ArticleCommentDto
) => {
  try {
    // Make a POST request to add a comment to the specified article
    const response = await axios.post(
      `${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/add-comment`,
      articleCommentDto
    );
    return response.data; // Return the response data from the API
  } catch (error) {
    // Handle errors from the API request
    if (axios.isAxiosError(error)) {
      console.error(
        "Error publishing comment:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Fetches comments for a specific article.
 * 
 * @param emailAccountId - ID of the email account associated with the user.
 * @param blogId - ID of the blog where the article resides.
 * @param articleId - ID of the article for which comments are fetched.
 * @returns The comments data from the API if successful or an empty array if no comments are found.
 * @throws An error if the API request fails.
 */
export const getCommentsApi = async (
  emailAccountId: number,
  blogId: number,
  articleId: number
) => {
  try {
    // Make a GET request to fetch comments for the specified article
    const response = await axios.get(
      `${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/get-comments`
    );
    return response.data; // Return the comments data from the API
  } catch (error) {
    // Handle errors from the API request
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        // Log a warning if no comments are found
        console.clear();
        console.warn(`No comments found for articleId ${articleId}`);
        return []; // Return an empty array if no comments are found
      }
    }
    console.error("Failed to fetch comments:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
