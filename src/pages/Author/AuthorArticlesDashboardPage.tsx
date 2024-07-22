import React, { useEffect, useState } from "react";
import * as MUI from "../../MUI/muiImports"; // Import Material-UI components and styles
import MainContentArea from "../../components/MainContentArea"; // Import MainContentArea component
import PageHeader from "../../components/PageHeader"; // Import PageHeader component
import CreateNewArticleButton from "../../components/buttons/CreateNewArticleButton"; // Import button component for creating new articles
import ArticlesDraftCard from "../../components/cards/Author/ArticlesDraftCard"; // Import card component for draft articles
import ArticlesPublishedCard from "../../components/cards/Author/ArticlesPublishedCard"; // Import card component for published articles
import { useParams } from "react-router-dom"; // Import hook for routing parameters
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux
import { RootState, AppDispatch } from "../../redux/store"; // Import types for Redux state and dispatch
import { getAllArticles, clearArticles } from "../../redux/articles/articlesSlice"; // Import Redux actions

// Define TypeScript interfaces for article data
interface ArticleDraft {
  articleId: number;
  articleTitle: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  publishedTimestamp: string;
}

interface ArticlePublished {
  articleId: number;
  articleTitle: string;
  publishedTimestamp: string;
  articleViewsCount: number;
}

const AuthorArticlesDashboardPage = () => {
  // Extract emailAccountId and blogId from URL parameters
  const { emailAccountId, blogId } = useParams<{
    emailAccountId: string;
    blogId: string;
  }>();

  // Access articles data from Redux store
  const { articles } = useSelector((state: RootState) => state.articles);
  const dispatch: AppDispatch = useDispatch();

  // State to store draft and published articles
  const [articlesDraft, setArticlesDraft] = useState<ArticleDraft[]>([]);
  const [articlesPublished, setArticlesPublished] = useState<ArticlePublished[]>([]);

  // Fetch articles when emailAccountId or blogId changes
  useEffect(() => {
    if (emailAccountId && blogId) {
      fetchArticles();
    }

    // Clear articles from Redux store when component unmounts
    return () => {
      dispatch(clearArticles());
    };
  }, [dispatch, emailAccountId, blogId]);

  // Update local state when articles data changes
  useEffect(() => {
    if (articles.length > 0) {
      const drafts = articles
        .filter((article) => article.articleStatus === "Draft")
        .map((article) => ({
          articleId: article.articleId,
          articleTitle: article.articleTitle,
          createdTimestamp: article.createdTimestamp,
          updatedTimestamp: article.updatedTimestamp,
          publishedTimestamp: article.publishedTimestamp,
        }));

      const published = articles
        .filter((article) => article.articleStatus === "Published")
        .map((article) => ({
          articleId: article.articleId,
          articleTitle: article.articleTitle,
          publishedTimestamp: article.publishedTimestamp,
          articleViewsCount: article.articleViewsCount,
        }));

      setArticlesDraft(drafts);
      setArticlesPublished(published);
    } else {
      setArticlesDraft([]);
      setArticlesPublished([]);
    }
  }, [articles]);

  // Function to dispatch action to fetch articles
  const fetchArticles = () => {
    if (emailAccountId && blogId) {
      dispatch(
        getAllArticles({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
        })
      );
    }
  };

  return (
    <MainContentArea>
      <PageHeader title="Articles Dashboard" />

      <MUI.Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", marginTop: 2, marginBottom: 4 }}
      >
        <CreateNewArticleButton
          emailAccountId={Number(emailAccountId)}
          blogId={Number(blogId)}
        />
      </MUI.Grid>

      <MUI.Grid
        container
        spacing={2}
        sx={{
          justifyContent: "left",
          marginTop: 2,
          marginBottom: 4,
          pl: 4,
        }}
      >
        <MUI.Typography variant="h4" component="h1" gutterBottom>
          Draft Articles
        </MUI.Typography>
      </MUI.Grid>

      {articlesDraft.length > 0 ? (
        <ArticlesDraftCard
          emailAccountId={Number(emailAccountId)}
          blogId={Number(blogId)}
          articles={articlesDraft}
          fetchArticles={fetchArticles}
        />
      ) : (
        <MUI.Typography sx={{ pl: 2 }}>No draft articles found.</MUI.Typography>
      )}

      <MUI.Grid
        container
        spacing={2}
        sx={{
          justifyContent: "left",
          marginTop: 2,
          marginBottom: 4,
          pl: 4,
        }}
      >
        <MUI.Typography variant="h4" component="h1" gutterBottom>
          Published Articles
        </MUI.Typography>
      </MUI.Grid>

      {articlesPublished.length > 0 ? (
        <ArticlesPublishedCard
          emailAccountId={Number(emailAccountId)}
          blogId={Number(blogId)}
          articles={articlesPublished}
          fetchArticles={fetchArticles}
        />
      ) : (
        <MUI.Typography sx={{ pl: 2 }}>No published articles found.</MUI.Typography>
      )}
    </MainContentArea>
  );
};

export default AuthorArticlesDashboardPage;
