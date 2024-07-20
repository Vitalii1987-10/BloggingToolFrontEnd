import React, { useEffect, useState } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import ArticlesDraftCard from "../../components/cards/Author/ArticlesDraftCard";
import ArticlesPublishedCard from "../../components/cards/Author/ArticlesPublishedCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { getAllArticles } from "../../redux/articles/articlesSlice";
import { clearArticles } from "../../redux/articles/articlesSlice";



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
  const { emailAccountId, blogId } = useParams<{
    emailAccountId: string;
    blogId: string;
  }>();
  const { articles } = useSelector((state: RootState) => state.articles);
  const dispatch: AppDispatch = useDispatch();

  const [articlesDraft, setArticlesDraft] = useState<ArticleDraft[]>([]);
  const [articlesPublished, setArticlesPublished] = useState<
    ArticlePublished[]
  >([]);

  useEffect(() => {
    if (emailAccountId && blogId) {
      fetchArticles()
    }
  }, [dispatch, emailAccountId, blogId]);

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

      // console.log("Draft articles:", drafts);
      // console.log("Published articles:", published);
    }
  }, [articles]);

  const fetchArticles = () => {
    if (emailAccountId && blogId) {
      dispatch(
        getAllArticles({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
        })
      );
    }
        
    return () => {
      dispatch(clearArticles());
    };
  };

  return (
    <MainContentArea>
      <PageHeader title="Articles Dashboard" />
      <MUI.Grid
        container
        spacing={2}
        sx={{
          justifyContent: "left",
          marginTop: 2,
          marginBottom: 4,
          marginLeft: 4,
        }}
      >
        <MUI.Typography variant="h4" component="h1" gutterBottom>
          Draft Articles
        </MUI.Typography>
      </MUI.Grid>

      <MUI.Grid
        container
        spacing={2}
        sx={{
          justifyContent: "left",
          marginTop: 2,
          marginBottom: 4,
          marginLeft: 4,
        }}
      >
        {articlesDraft.length > 0 ? (
          <ArticlesDraftCard 
            emailAccountId={Number(emailAccountId)}
            blogId={Number(blogId)}
            articles={articlesDraft}
            fetchArticles={fetchArticles}
          />
        ) : (
          <p>No draft articles found.</p>
        )}
      </MUI.Grid>

      <MUI.Grid
        container
        spacing={2}
        sx={{
          justifyContent: "left",
          marginTop: 2,
          marginBottom: 4,
          marginLeft: 4,
        }}
      >
        <MUI.Typography variant="h4" component="h1" gutterBottom>
          Published Articles
        </MUI.Typography>
      </MUI.Grid>

      <MUI.Grid
        container
        spacing={2}
        sx={{
          justifyContent: "left",
          marginTop: 2,
          marginBottom: 4,
          marginLeft: 4,
        }}
      >
        {articlesPublished.length > 0 ? (
          <ArticlesPublishedCard 
          emailAccountId={Number(emailAccountId)}
          blogId={Number(blogId)}
          articles={articlesPublished}
          fetchArticles={fetchArticles}
        />
        ) : (
          <p>No published articles found.</p>
        )}
      </MUI.Grid>
    </MainContentArea>
  );
};

export default AuthorArticlesDashboardPage;
