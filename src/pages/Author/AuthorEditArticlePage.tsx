import React, { useEffect, useState } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getArticleById, clearArticle } from "../../redux/articles/articlesSlice";
import { updateArticle } from "../../redux/articles/articlesSlice"; // Add this import if you have an updateArticle action
import { useTheme } from '@mui/material/styles';

interface ArticleDto {
  articleTitle: string;
  articleAuthor: string;
  content: string;
}

const AuthorEditArticlePage = () => {
  const { emailAccountId, blogId, articleId } = useParams<{
    emailAccountId: string;
    blogId: string;
    articleId: string;
  }>();

  const dispatch: AppDispatch = useDispatch();
  const article = useSelector((state: RootState) => state.articles.article);
  const theme = useTheme();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

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

    return () => {
      dispatch(clearArticle());
    };
  }, [dispatch, emailAccountId, blogId, articleId]);

  useEffect(() => {
    if (article) {
      setTitle(article.articleTitle || "");
      setAuthor(article.articleAuthor || "");
      setContent(article.content || "");
    }
  }, [article]);

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
          updateArticle({ emailAccountId: Number(emailAccountId), blogId: Number(blogId), articleId: Number(articleId), articleUpdateDto })
        );

        if (updateArticle.fulfilled.match(resultAction)) {
          navigate(`/author/${emailAccountId}/blog/${blogId}/articles`); // Navigate only after successful update
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
          <p>Loading article...</p>
        )}
      </MUI.Paper>
    </MainContentArea>
  );
};

export default AuthorEditArticlePage;
