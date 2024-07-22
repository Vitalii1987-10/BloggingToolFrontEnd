import React, { useEffect } from "react";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import ReaderBlogsCard from "../../components/cards/Reader/ReaderBlogsCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setPage } from "../../redux/pageSlice";
import { readerGetAllblogs, clearBlogs } from "../../redux/blogs/blogsSlice";
import { useParams } from "react-router-dom";

// ReaderBlogsDashboard component definition
const ReaderBlogsDashboard: React.FC = () => {
  // Extract emailAccountId from the URL parameters
  const { emailAccountId } = useParams<{ emailAccountId: string }>();

  // Access the readerBlogs state from Redux
  const { readerBlogs } = useSelector((state: RootState) => state.blogs);

  // Initialize the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Set the page type to "Reader" when the component mounts
  React.useEffect(() => {
    dispatch(setPage("Reader"));
  }, [dispatch]);

  // Fetch blogs data when the component mounts or when emailAccountId changes
  useEffect(() => {
    if (emailAccountId) {
      dispatch(readerGetAllblogs(Number(emailAccountId)));
    }

    // Clean up the state when the component unmounts
    return () => {
      dispatch(clearBlogs());
    };
  }, [dispatch, emailAccountId]);

  // Render the ReaderBlogsDashboard component
  return (
    <MainContentArea>
      {/* Page header for the blogs section */}
      <PageHeader title="All Blogs" />

      {/* Conditionally render the blogs or a message if no blogs are found */}
      {readerBlogs.length > 0 ? (
        <ReaderBlogsCard
          emailAccountId={Number(emailAccountId)}
          blogs={readerBlogs}
        />
      ) : (
        <p>No blogs found.</p>
      )}
    </MainContentArea>
  );
};

export default ReaderBlogsDashboard;
