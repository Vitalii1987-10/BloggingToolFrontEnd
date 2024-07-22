import * as React from "react";
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Purpose: This component displays a card for each blog, including its title, author, and category, and includes a button to navigate to the articles of that blog.

interface Blog {
  blogId: number; // Unique identifier for the blog
  blogTitle: string; // Title of the blog
  blogAuthor: string; // Author of the blog
  blogCategory: string; // Category of the blog
}

interface BlogsCardProps {
  emailAccountId: number; // ID of the email account (used for navigation)
  blogs: Blog[]; // Array of blog objects to display
}

const ReaderBlogsCard: React.FC<BlogsCardProps> = ({
  emailAccountId,
  blogs,
}) => {
  const theme = useTheme(); // Hook to access the theme object for styling
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handler function for navigating to the articles of the selected blog
  const handleEmailAccountClick = (emailAccountId: number, blogId: number) => {
    navigate(`/reader/${emailAccountId}/blog/${blogId}/articles`);
  };

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
                variant="h6" // Changed to h6 for smaller size
                sx={{
                  mb: 1,
                  marginLeft: 1,
                  color: theme.palette.card.text,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {blog.blogAuthor}
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

            <MUI.Box mt={2} mb={2} display="flex" justifyContent="center">
              <MUI.Button
                variant="text"
                onClick={() =>
                  handleEmailAccountClick(emailAccountId, blog.blogId)
                }
                sx={{
                  backgroundColor: theme.palette.openButton.main,
                  color: theme.palette.openButton.text, // Text color
                  fontSize: {
                    xs: '10px', // Font size for smaller mobile devices (extra small)
                    sm: '14px', // Font size for small screens
                    md: '14px', // Font size for medium screens
                    lg: '16px', // Font size for large screens
                    xl: '18px' // Font size for extra large screens
                  },
                  minWidth: {
                    xs: '70px',  // Size for smaller mobile devices (extra small)
                    sm: '90px',  // Size for small screens
                    md: '90px',  // Size for medium screens
                    lg: '100px',  // Size for large screens
                    xl: '120px' // Size for extra large screens and up
                  },
                  borderColor: theme.palette.openButton.borderColor,
                  borderStyle: "solid",
                  borderWidth: "1px 0",
                  borderRadius: "4px", // Border radius
                  textAlign: "center", // Center align text
                  textTransform: "none", // Preserve case
                  "&:hover": {
                    backgroundColor: theme.palette.openButton.hoverColor, // Hover background color
                  },
                }}
              >
                Open
              </MUI.Button>
            </MUI.Box>
          </MUI.Card>
        </MUI.Grid>
      ))}
    </MUI.Grid>
  );
};

export default ReaderBlogsCard;
