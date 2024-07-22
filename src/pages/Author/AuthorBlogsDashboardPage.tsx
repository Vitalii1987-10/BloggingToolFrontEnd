import React, { useEffect } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import CreateNewBlogButton from "../../components/buttons/CreateNewBlogButton";
import AuthorBlogsCard from "../../components/cards/Author/AuthorBlogsCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setPage } from "../../redux/pageSlice";
import { authorGetAllblogs, clearBlogs } from "../../redux/blogs/blogsSlice";
import { useParams } from "react-router-dom";

// AuthorBlogsDashboardPage component
const AuthorBlogsDashboardPage = () => {
  // Extract emailAccountId from URL parameters
  const { emailAccountId } = useParams<{ emailAccountId: string }>();
  // Extract blogs state from the Redux store
  const { blogs } = useSelector((state: RootState) => state.blogs);
  // Get the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Set the page title to "Author" when the component mounts
  useEffect(() => {
    dispatch(setPage("Author"));
  }, [dispatch]);

  // Fetch all blogs for the author when emailAccountId changes
  useEffect(() => {
    if (emailAccountId) {
      dispatch(authorGetAllblogs(Number(emailAccountId)));
    }

    // Clear blogs when the component unmounts
    return () => {
      dispatch(clearBlogs());
    };
  }, [dispatch, emailAccountId]);

  return (
    <MainContentArea>
      {/* Page header */}
      <PageHeader title="Blogs Dashboard" />
      
      {/* Grid container for the "Create New Blog" button */}
      <MUI.Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", marginTop: 2, marginBottom: 4 }}
      >
        {/* Button to create a new blog */}
        <CreateNewBlogButton emailAccountId={Number(emailAccountId)}/>
      </MUI.Grid>

      {/* Display list of blogs or a message if no blogs are found */}
      {blogs.length > 0 ? (
        <AuthorBlogsCard
          emailAccountId={Number(emailAccountId)}
          blogs={blogs}
        />
      ) : (
        <p>No blogs found.</p>
      )}
    </MainContentArea>
  );
};

export default AuthorBlogsDashboardPage;
