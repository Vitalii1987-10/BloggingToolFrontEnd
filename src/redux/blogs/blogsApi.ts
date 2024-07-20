import axios from "axios";

const API_URL = "http://localhost:5045/user";

interface BlogDto {
  blogTitle: string;
  blogAuthor: string;
  blogCategory: string;
}

export const fetchAllBlogs = async (emailAccountId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${emailAccountId}/blogs`);
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

export const fetchBlogById = async (emailAccountId: number, blogId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/${emailAccountId}/blog/${blogId}`
    );
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

export const addBlog = async (emailAccountId: number, blogDto: BlogDto) => {
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

export const deleteBlog = async (emailAccountId: number, blogId: number) => {
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

export const updateBlogById = async (emailAccountId: number, blogId: number, blogDto: BlogDto) => {
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

