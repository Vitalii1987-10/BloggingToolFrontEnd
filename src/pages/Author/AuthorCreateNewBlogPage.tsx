import React, { useState } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../redux/blogs/blogsSlice";

interface BlogDto {
  blogTitle: string;
  blogAuthor: string;
  blogCategory: string;
}

const CreateNewBlogPage: React.FC = () => {
  const { emailAccountId } = useParams<{ emailAccountId: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // State for form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogDto: BlogDto = {
      blogTitle: title,
      blogAuthor: author,
      blogCategory: category,
    };

    if (emailAccountId) {
      try {
        const resultAction = await dispatch(
          createBlog({ emailAccountId: Number(emailAccountId), blogDto })
        );

        if (createBlog.fulfilled.match(resultAction)) {
          navigate(`/author/${emailAccountId}/blogs`); // Navigate only after successful creation
        } else {
          console.error("Failed to create blog:", resultAction.payload);
        }
      } catch (error) {
        console.error("Failed to create blog:", error);
      }
    }
  };

  return (
    <MainContentArea>
      <PageHeader title="Create New Blog" />
      <MUI.Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: theme.palette.card.main,
          borderColor: theme.palette.card.borderColor,
          borderStyle: "solid",
          borderWidth: "1px 0",
        }}
      >
        <MUI.Typography variant="h5" sx={{ mb: 2 }}>
          Create New Blog
        </MUI.Typography>
        <form onSubmit={handleSubmit}>
          <MUI.TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MUI.TextField
            label="Author"
            fullWidth
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MUI.FormControl fullWidth required sx={{ mb: 2 }}>
            <MUI.InputLabel>Category</MUI.InputLabel>
            <MUI.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
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
            Create Blog
          </MUI.Button>
        </form>
      </MUI.Paper>
    </MainContentArea>
  );
};

export default CreateNewBlogPage;
