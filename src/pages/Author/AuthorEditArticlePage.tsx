import React, { useEffect, useState } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getArticleById, clearArticle, updateArticle } from "../../redux/articles/articlesSlice";
import { useTheme } from '@mui/material/styles';

// Define the ArticleDto interface
interface ArticleDto {
  articleTitle: string;
  articleAuthor: string;
  content: string;
}

// AuthorEditArticlePage component
const AuthorEditArticlePage: React.FC = () => {
  // Extract emailAccountId, blogId, and articleId from URL parameters
  const { emailAccountId, blogId, articleId } = useParams<{
    emailAccountId: string;
    blogId: string;
    articleId: string;
  }>();

  // Get the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();
  // Get the current article from the Redux state
  const article = useSelector((state: RootState) => state.articles.article);
  // Access the current theme
  const theme = useTheme();
  // Initialize the navigate function from React Router
  const navigate = useNavigate();

  // State variables for form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // Fetch the article when the component mounts
  useEffect(() => {
    if (emailAccountId && blogId && articleId) {
      dispatch(
        getArticleById({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
          articleId: Number(articleId),
        })
      );
    }

    // Clear the article when the component unmounts
    return () => {
      dispatch(clearArticle());
    };
  }, [dispatch, emailAccountId, blogId, articleId]);

  // Update form fields when the article is loaded
  useEffect(() => {
    if (article) {
      setTitle(article.articleTitle || "");
      setAuthor(article.articleAuthor || "");
      setContent(article.content || "");
    }
  }, [article]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const articleUpdateDto: ArticleDto = {
      articleTitle: title,
      articleAuthor: author,
      content: content,
    };

    if (emailAccountId && blogId && articleId) {
      try {
        const resultAction = await dispatch(
          updateArticle({
            emailAccountId: Number(emailAccountId),
            blogId: Number(blogId),
            articleId: Number(articleId),
            articleUpdateDto,
          })
        );

        if (updateArticle.fulfilled.match(resultAction)) {
          // Navigate to the articles page upon successful update
          navigate(`/author/${emailAccountId}/blog/${blogId}/articles`);
        } else {
          console.error("Failed to update article:", resultAction.payload);
        }
      } catch (error) {
        console.error("Failed to update article:", error);
      }
    }
  };

  return (
    <MainContentArea>
      {/* Page header */}
      <PageHeader title="Article Detail" />
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
          Edit Article
        </MUI.Typography>
        {article ? (
          // Form for editing the article
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
            <MUI.TextField
              label="Content"
              fullWidth
              required
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 2 }}
            />
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
              Update Article
            </MUI.Button>
          </form>
        ) : (
          // Display a loading message while the article is being fetched
          <p>Loading article...</p>
        )}
      </MUI.Paper>
    </MainContentArea>
  );
};

export default AuthorEditArticlePage;
