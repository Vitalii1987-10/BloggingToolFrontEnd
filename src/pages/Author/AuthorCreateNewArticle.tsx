import React, { useState } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addArticle } from "../../redux/articles/articlesSlice";

// Define the ArticleCreateDto interface
interface ArticleCreateDto {
  articleTitle: string;
  articleAuthor: string;
  articleStatus: string;  
  content: string;
}

// CreateNewArticlePage component
const CreateNewArticlePage: React.FC = () => {
  // Extract emailAccountId and blogId from URL parameters
  const { emailAccountId, blogId } = useParams<{ emailAccountId: string; blogId: string }>();
  // Access the current theme
  const theme = useTheme();
  // Initialize the navigate function from React Router
  const navigate = useNavigate();
  // Get the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Draft");

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const articleCreateDto: ArticleCreateDto = {
      articleTitle: title,
      articleAuthor: author,
      articleStatus: status,
      content: content
    };

    if (emailAccountId && blogId) {
      try {
        const resultAction = await dispatch(
          addArticle({ emailAccountId: Number(emailAccountId), blogId: Number(blogId), articleCreateDto })
        );

        if (addArticle.fulfilled.match(resultAction)) {
          // Navigate to the articles page upon successful creation
          navigate(`/author/${emailAccountId}/blog/${blogId}/articles`); 
        } else {
          console.error("Failed to create article:", resultAction.payload);
        }
      } catch (error) {
        console.error("Failed to create article:", error);
      }
    }
  };

  return (
    <MainContentArea>
      {/* Page header */}
      <PageHeader title="Create New Article" />
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
          Create New Article
        </MUI.Typography>
        {/* Form for creating a new article */}
        <form onSubmit={handleSubmit}>
          {/* Title input field */}
          <MUI.TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Author input field */}
          <MUI.TextField
            label="Author"
            fullWidth
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Status dropdown field */}
          <MUI.FormControl fullWidth required sx={{ mb: 2 }}>
            <MUI.InputLabel>Status</MUI.InputLabel>
            <MUI.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MUI.MenuItem value="Draft">Draft</MUI.MenuItem>
              <MUI.MenuItem value="Published">Published</MUI.MenuItem>
            </MUI.Select>
          </MUI.FormControl>
          {/* Content input field */}
          <MUI.TextField
            label="Content"
            fullWidth
            required
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Submit button */}
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
            Create Article
          </MUI.Button>
        </form>
      </MUI.Paper>
    </MainContentArea>
  );
};

export default CreateNewArticlePage;
