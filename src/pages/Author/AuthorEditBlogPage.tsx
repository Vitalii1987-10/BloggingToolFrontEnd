import React, { useEffect, useState } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBlogById, updateBlog } from "../../redux/blogs/blogsSlice";

// Define the BlogDto interface to structure the data to be updated
interface BlogDto {
  blogTitle: string;
  blogAuthor: string;
  blogCategory: string;
}

// EditBlogPage component definition
const EditBlogPage: React.FC = () => {
  // Extract emailAccountId and blogId from the URL parameters
  const { emailAccountId, blogId } = useParams<{
    emailAccountId: string;
    blogId: string;
  }>();

  // Initialize Redux dispatch function
  const dispatch = useAppDispatch();

  // Access the current blog from the Redux state
  const blog = useAppSelector((state) => state.blogs.blog);

  // Access the current theme from Material-UI
  const theme = useTheme();

  // Initialize the navigation function from React Router
  const navigate = useNavigate();

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  // Fetch the blog details when the component mounts or when emailAccountId/blogId changes
  useEffect(() => {
    if (emailAccountId && blogId) {
      dispatch(
        getBlogById({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
        })
      );
    }
  }, [dispatch, emailAccountId, blogId]);

  // Update form fields when the blog data is loaded
  useEffect(() => {
    if (blog) {
      setTitle(blog.blogTitle || "");
      setAuthor(blog.blogAuthor || "");
      setCategory(blog.blogCategory || "");
    }
  }, [blog]);

  // Handle form submission for updating the blog
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogDto: BlogDto = {
      blogTitle: title,
      blogAuthor: author,
      blogCategory: category,
    };

    if (emailAccountId && blogId) {
      try {
        const resultAction = await dispatch(
          updateBlog({
            emailAccountId: Number(emailAccountId),
            blogId: Number(blogId),
            blogDto,
          })
        );

        if (updateBlog.fulfilled.match(resultAction)) {
          // Navigate to the blogs page upon successful update
          navigate(`/author/${emailAccountId}/blogs`);
        } else {
          console.error("Failed to update blog:", resultAction.payload);
        }
      } catch (error) {
        console.error("Failed to update blog:", error);
      }
    }
  };

  // Render the EditBlogPage component
  return (
    <MainContentArea>
      {/* Page header */}
      <PageHeader title="Edit Blog" />
      
      {/* Form container */}
      <MUI.Paper
        elevation={3}
        className="edit-blog-form" 
        sx={{
          padding: 3,
          backgroundColor: theme.palette.card.main,
          borderColor: theme.palette.card.borderColor,
          borderStyle: "solid",
          borderWidth: "1px 0",
        }}
      >
        {/* Form title */}
        <MUI.Typography variant="h5" sx={{ mb: 2 }}>
          Edit Blog
        </MUI.Typography>

        {/* Form for editing the blog */}
        <form onSubmit={handleSubmit} className="edit-blog-form">
          <MUI.TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-blog-title-input"
            sx={{ mb: 2 }}
          />
          <MUI.TextField
            label="Author"
            fullWidth
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="edit-blog-author-input"
            sx={{ mb: 2 }}
          />
          <MUI.FormControl fullWidth required sx={{ mb: 2 }}>
            <MUI.InputLabel>Category</MUI.InputLabel>
            <MUI.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              className="edit-blog-category-select"
            >
              <MUI.MenuItem value="Technology">Technology</MUI.MenuItem>
              <MUI.MenuItem value="Science">Science</MUI.MenuItem>
              <MUI.MenuItem value="Health">Health</MUI.MenuItem>
              <MUI.MenuItem value="Lifestyle">Lifestyle</MUI.MenuItem>
            </MUI.Select>
          </MUI.FormControl>

          <MUI.Button
            type="submit"
            variant="contained"
            className="edit-blog-submit-button"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.saveButton.main,
              color: theme.palette.saveButton.text,
              boxShadow: 1,
              "&:hover": {
                backgroundColor: theme.palette.toArticlesButton.hoverColor,
              },
            }}
          >
            Update Blog
          </MUI.Button>
        </form>
      </MUI.Paper>
    </MainContentArea>
  );
};

export default EditBlogPage;
