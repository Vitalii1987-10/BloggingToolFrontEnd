import axios from "axios";

const API_URL = "http://localhost:5045/user";

interface ArticleUpdateDto {
  articleTitle: string;
  articleAuthor: string;
  content: string
}

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
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

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
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
}

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

export const updateArticleById = async(emailAccountId: number, blogId: number, articleId: number, articleUpdateDto: ArticleUpdateDto) => {
  try {
    const response = await axios.put(`${API_URL}/${emailAccountId}/blog/${blogId}/article/${articleId}/update-article`, articleUpdateDto);
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


