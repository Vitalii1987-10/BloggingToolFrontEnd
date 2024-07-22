import React, { useEffect, useState } from "react";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import ReaderArticleCard from "../../components/cards/Reader/ReaderArticleCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import {
  getAllArticles,
  clearArticles,
} from "../../redux/articles/articlesSlice";
import { getBlogById, clearBlogs } from "../../redux/blogs/blogsSlice";

// Define the interface for articles
interface Articles {
  articleId: number;
  articleTitle: string;
  publishedTimestamp: string;
}

// ReaderArticlesDashboard component definition
const ReaderArticlesDashboard: React.FC = () => {
  // Extract emailAccountId and blogId from the URL parameters
  const { emailAccountId, blogId } = useParams<{
    emailAccountId: string;
    blogId: string;
  }>();

  // Access the articles state from Redux
  const { articles } = useSelector((state: RootState) => state.articles);

  // Access the current blog state from Redux
  const blog = useAppSelector((state) => state.blogs.blog);

  // Initialize the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // State variables for the blog title, author, and published articles
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [articlesPublished, setArticlesPublished] = useState<Articles[]>([]);

  // Fetch data and clear previous states when the component mounts or when emailAccountId/blogId changes
  useEffect(() => {
    if (emailAccountId && blogId) {
      dispatch(clearBlogs());
      dispatch(clearArticles());

      if (emailAccountId && blogId) {
        dispatch(
          getBlogById({
            emailAccountId: Number(emailAccountId),
            blogId: Number(blogId),
          })
        );
  
        dispatch(
          getAllArticles({
            emailAccountId: Number(emailAccountId),
            blogId: Number(blogId),
          })
        );
      }
    }

    // Clean up the state when the component unmounts
    return () => {
      dispatch(clearBlogs());
      dispatch(clearArticles());
    };
  }, [dispatch, emailAccountId, blogId]);

  // Update the published articles state when the articles state changes
  useEffect(() => {
    if (articles.length > 0) {
      const published = articles
        .filter((article) => article.articleStatus === "Published")
        .map((article) => ({
          articleId: article.articleId,
          articleTitle: article.articleTitle,
          publishedTimestamp: article.publishedTimestamp,
        }));
      setArticlesPublished(published);
    }
  }, [articles]);

  // Update the blog title and author state when the blog state changes
  useEffect(() => {
    if (blog) {
      setTitle(blog.blogTitle || "");
      setAuthor(blog.blogAuthor || "");
    }
  }, [blog]);

  // Render the ReaderArticlesDashboard component
  return (
    <MainContentArea>
      {/* Page headers for the blog title and author */}
      <PageHeader title={title} />
      <PageHeader title={`By ${author}`} />

      {/* Conditionally render the articles or a message if no articles are found */}
      {articlesPublished.length > 0 ? (
        <ReaderArticleCard
          emailAccountId={Number(emailAccountId)}
          blogId={Number(blogId)}
          articles={articlesPublished}
        />
      ) : (
        <p>No articles found.</p>
      )}
    </MainContentArea>
  );
};

export default ReaderArticlesDashboard;
