import * as React from "react";
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from "@mui/material/styles";
import ToArticlesButton from "../../buttons/BlogCardButtons/ToArticlesButton";
import DeleteBlogButton from "../../buttons/BlogCardButtons/DeleteBlogButton";
import EditBlogButton from "../../buttons/BlogCardButtons/EditBlogButton";

// Purpose: This component renders a card for each blog, showing its details and providing action buttons for navigating to articles, deleting, and editing the blog.

interface Blog {
  blogId: number; // Unique identifier for the blog
  blogTitle: string; // Title of the blog
  blogCategory: string; // Category or type of the blog
}

interface BlogsCardProps {
  emailAccountId: number; // ID of the email account owning the blogs
  blogs: Blog[]; // Array of blog objects to display
}

const AuthorBlogsCard: React.FC<BlogsCardProps> = ({ emailAccountId, blogs }) => {
  const theme = useTheme(); // Hook to access the theme object for styling

  return (
    <MUI.Grid container spacing={2}>
      {blogs.map((blog) => (
        <MUI.Grid item xs={12} sm={6} md={4} key={blog.blogId}>
          <MUI.Card
            sx={{
              minWidth: {
                xs: 240, // Small mobile devices
                sm: 280, // Extra small screens
                md: 300, // Small screens
                lg: 320, // Medium screens
                xl: 340 // Large screens and up
              },
              maxWidth: "100%",
              bgcolor: theme.palette.card.main,
              borderColor: theme.palette.card.borderColor,
              borderStyle: "solid",
              borderWidth: "1px 0",
            }}
          >
            <MUI.CardContent>
              <MUI.Typography
                variant="h5"
                sx={{
                  mb: 1,
                  marginLeft: 1,
                  color: theme.palette.card.text,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {blog.blogTitle}
              </MUI.Typography>
              <MUI.Typography
                variant="body1"
                sx={{
                  marginLeft: 1,
                  color: theme.palette.card.text,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {blog.blogCategory}
              </MUI.Typography>
            </MUI.CardContent>

            <MUI.Divider orientation="horizontal" flexItem />

            <MUI.CardActions>
              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <ToArticlesButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for navigation to articles
                    blogId={blog.blogId} // Pass blogId to identify which blog's articles to navigate to
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <DeleteBlogButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for deleting the blog
                    blogId={blog.blogId} // Pass blogId to identify which blog to delete
                  />
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>

            <MUI.CardActions>
              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <EditBlogButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for editing the blog
                    blogId={blog.blogId} // Pass blogId to identify which blog to edit
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container>
                <MUI.Grid item xs={6}>
                  {/* Empty grid item for layout alignment */}
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>
          </MUI.Card>
        </MUI.Grid>
      ))}
    </MUI.Grid>
  );
};

export default AuthorBlogsCard;
