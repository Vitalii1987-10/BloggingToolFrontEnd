import React, { useEffect } from "react";
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import CreateNewBlogButton from "../../components/buttons/CreateNewBlogButton";
import BlogsCard from "../../components/cards/Author/BlogsCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setPage } from "../../redux/pageSlice";
import { getAllBlogs } from "../../redux/blogs/blogsSlice";
import { useParams } from "react-router-dom";
import { clearBlogs } from "../../redux/blogs/blogsSlice";


const AuthorBlogsDashboardPage = () => {
  const { emailAccountId } = useParams<{ emailAccountId: string }>();
  const { blogs } = useSelector((state: RootState) => state.blogs);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPage("Author"));
  }, [dispatch]);

  useEffect(() => {
    if (emailAccountId) {
      dispatch(getAllBlogs(Number(emailAccountId)));
    }
    
    return () => {
      dispatch(clearBlogs());
    };
  }, [dispatch, emailAccountId]);

   //console log users array. Need to delete when the app is finished.
  // useEffect(() => {
  //   if (blogs.length > 0) {
  //     console.log(blogs);
  //   }
  // }, [blogs]);

  return (
    <MainContentArea>
      <PageHeader title="Blogs Dashboard" />
      <MUI.Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", marginTop: 2, marginBottom: 4 }}
      >
      <CreateNewBlogButton emailAccountId={Number(emailAccountId)}/>

      </MUI.Grid>

      {blogs.length > 0 ? (
        <BlogsCard
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
