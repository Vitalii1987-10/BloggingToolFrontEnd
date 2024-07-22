import React, { useEffect, useState, useRef } from "react"; // Import necessary hooks from React
import * as MUI from "../../MUI/muiImports"; // Import all MUI components from the specified path
import MainContentArea from "../../components/MainContentArea"; // Import MainContentArea component
import PageHeader from "../../components/PageHeader"; // Import PageHeader component
import { useTheme } from "@mui/material/styles"; // Import useTheme hook from Material-UI
import { useDispatch, useSelector } from "react-redux"; // Import hooks for dispatching actions and selecting state from Redux
import { RootState, AppDispatch } from "../../redux/store"; // Import RootState and AppDispatch types from Redux store
import { useParams } from "react-router-dom"; // Import useParams hook from React Router
import { getComments } from "../../redux/articleComments/articleCommentsSlice"; // Import getComments action from articleCommentsSlice
import { addComment } from "../../redux/articleComments/articleCommentsSlice"; // Import addComment action from articleCommentsSlice
import { getReaderArticleById } from "../../redux/articles/articlesSlice"; // Import getReaderArticleById action from articlesSlice
import { clearBlogs } from "../../redux/blogs/blogsSlice"; // Import clearBlogs action from blogsSlice
import { clearArticle } from "../../redux/articles/articlesSlice"; // Import clearArticle action from articlesSlice
import { clearComments } from "../../redux/articleComments/articleCommentsSlice"; // Import clearComments action from articleCommentsSlice
import { incrementArticleViews } from "../../redux/articles/articlesSlice"; // Import incrementArticleViews action from articlesSlice

// The purpose of this page is to display an article and its comments, allow users to submit comments, and track article views.

const ReaderArticle = () => {
  const theme = useTheme(); // Get the current theme
  const { emailAccountId, blogId, articleId } = useParams<{
    emailAccountId: string;
    blogId: string;
    articleId: string;
  }>(); // Get URL parameters
  const dispatch: AppDispatch = useDispatch(); // Get the dispatch function

  // Select comments and article data from the Redux store
  const { comments, article } = useSelector((state: RootState) => ({
    comments: state.articleComments.comments,
    article: state.articles.article,
  }));

  const [commentatorName, setName] = useState(""); // State for storing commentator's name
  const [comment, setComment] = useState(""); // State for storing the comment text
  const runOnce = useRef(false); // Ref to track if the article views increment has been run

  // This effect is for fetching data and clearing store state on mount/unmount
  useEffect(() => {
    if (emailAccountId && blogId) {
      dispatch(clearBlogs()); // Clear blogs from the Redux store
      dispatch(clearArticle()); // Clear the article from the Redux store
      dispatch(clearComments()); // Clear comments from the Redux store
      //fetchData(); // Fetch the article and comments data

      if (emailAccountId && blogId && articleId) {
        dispatch(
          getComments({
            emailAccountId: Number(emailAccountId),
            blogId: Number(blogId),
            articleId: Number(articleId),
          })
        );
        // Fetch comments
        dispatch(
          getReaderArticleById({
            emailAccountId: Number(emailAccountId),
            blogId: Number(blogId),
            articleId: Number(articleId),
          })
        ); // Fetch the article
      }

    }

    return () => {
      dispatch(clearBlogs()); // Clear blogs from the Redux store on component unmount
      dispatch(clearArticle()); // Clear the article from the Redux store on component unmount
      dispatch(clearComments()); // Clear comments from the Redux store on component unmount
    };
  }, [dispatch, emailAccountId, blogId, articleId]); // Run effect when dispatch, emailAccountId, blogId, or articleId changes

  // This effect is for incrementing article views once
  useEffect(() => {
    if (runOnce.current === false) {
      dispatch(
        incrementArticleViews({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
          articleId: Number(articleId),
        })
      ); // Increment article views
      runOnce.current = true; // Mark as run to prevent multiple increments
    }
    return () => {};
  }, [dispatch, emailAccountId, blogId, articleId]);

  // Function to handle comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentatorName && comment) {
      await dispatch(
        addComment({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
          articleId: Number(articleId),
          articleCommentDto: {
            commentatorName,
            comment,
            createdTimestamp: new Date(),
          },
        })
      );
      // Add a comment
      setName(""); // Clear commentator's name input
      setComment(""); // Clear comment input
      dispatch(
        getComments({
          emailAccountId: Number(emailAccountId),
          blogId: Number(blogId),
          articleId: Number(articleId),
        })
      ); // Fetch comments again to update the list
    }
  };

  return (
    <MainContentArea>
      {/* Page Header displaying the article title or a loading message */}
      <PageHeader title={article?.articleTitle || "Loading..."} />

      {/* Container for displaying the article content */}
      <MUI.Container>
        <MUI.Paper
          elevation={3}
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          <MUI.Typography variant="body1" paragraph>
            {article?.content?.replace(/\r?\n/g, "\n")}{" "}
            {/* Display the article content */}
          </MUI.Typography>
        </MUI.Paper>
      </MUI.Container>

      {/* Container for displaying the total views count */}
      <MUI.Container>
        <MUI.Paper
          elevation={3}
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          <MUI.Typography variant="body1" align="center" gutterBottom>
            Total views: {article?.articleViewsCount}{" "}
            {/* Display the total views count */}
          </MUI.Typography>
        </MUI.Paper>
      </MUI.Container>

      <MUI.Container>
        <MUI.Paper
          elevation={3}
          sx={{
            padding: 3,
            marginBottom: 3,
          }}
        >
          <MUI.Typography variant="h5" sx={{ mb: 2 }}>
            Submit Comment
          </MUI.Typography>
          <form onSubmit={handleSubmit}>
            <MUI.Grid container spacing={2}>
              <MUI.Grid item xs={12} md={4}>
                <MUI.TextField
                  label="Name"
                  fullWidth
                  required
                  multiline
                  rows={2}
                  margin="normal"
                  value={commentatorName}
                  onChange={(e) => setName(e.target.value)}
                  sx={{
                    mb: 2,
                    maxWidth: "100%",
                  }}
                />
              </MUI.Grid>
              <MUI.Grid item xs={12} md={8}>
                <MUI.TextField
                  label="Comment"
                  fullWidth
                  required
                  multiline
                  rows={2} 
                  margin="normal"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    mb: 2,
                    maxWidth: "100%",
                  }}
                />
              </MUI.Grid>
            </MUI.Grid>
            <MUI.Box display="flex" justifyContent="center" mt={2}>
              <MUI.Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.submitCommentButton.main,
                  color: theme.palette.submitCommentButton.text,
                  boxShadow: 1,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.submitCommentButton.hoverColor,
                  },
                }}
              >
                Submit Comment
              </MUI.Button>
            </MUI.Box>
          </form>
        </MUI.Paper>
      </MUI.Container>

      {/* Container for displaying comments */}
      <MUI.Container>
        <MUI.Paper
          elevation={3}
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          {comments.length === 0 ? (
            <MUI.Typography align="center">
              No comments available{" "}
              {/* Display message if no comments are available */}
            </MUI.Typography>
          ) : (
            comments.map((comment, index) => (
              <MUI.Box
                key={index}
                mb={2}
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius={2}
              >
                <MUI.Typography variant="body2" paragraph>
                  {comment.comment} {/* Display each comment */}
                </MUI.Typography>
                <MUI.Typography variant="caption" color="textSecondary">
                  {`From: ${comment.commentatorName} | Created: ${comment.createdTimestamp}`}{" "}
                  {/* Display commentator's name and timestamp */}
                </MUI.Typography>
              </MUI.Box>
            ))
          )}
        </MUI.Paper>
      </MUI.Container>
    </MainContentArea>
  );
};

export default ReaderArticle;
