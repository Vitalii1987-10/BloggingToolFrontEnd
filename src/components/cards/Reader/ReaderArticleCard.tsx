import * as React from "react";
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Purpose: This component displays a card for each article, including its title, publication timestamp, and a button to navigate to the full article view.

interface Article {
  articleId: number; // Unique identifier for the article
  articleTitle: string; // Title of the article
  publishedTimestamp: string; // Date and time when the article was published
}

interface ReaderArticleCardProps {
  emailAccountId: number; // ID of the email account (used for navigation)
  blogId: number; // ID of the blog (used for navigation)
  articles: Article[]; // Array of article objects to display
}

const ReaderArticleCard: React.FC<ReaderArticleCardProps> = ({
  emailAccountId,
  blogId,
  articles,
}) => {
  const theme = useTheme(); // Hook to access the theme object for styling
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Handler function for navigating to the full article view
  const handleEmailAccountClick = (emailAccountId: number, blogId: number, articleId: number) => {
    navigate(`/reader/${emailAccountId}/blog/${blogId}/article/${articleId}`);
  };

  return (
    <MUI.Grid container spacing={2}>
      {articles.map((article) => (
        <MUI.Grid item xs={12} sm={6} md={4} key={article.articleId}>
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
                {article.articleTitle}
              </MUI.Typography>

              <MUI.Typography
                variant="body1"
                sx={{
                  mb: 1,
                  marginLeft: 1,
                  color: theme.palette.card.text,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Published: {article.publishedTimestamp}
              </MUI.Typography>
            </MUI.CardContent>

            <MUI.Divider orientation="horizontal" flexItem />

            <MUI.Box mt={2} mb={2} display="flex" justifyContent="center">
              <MUI.Button
                variant="text"
                onClick={() =>
                  handleEmailAccountClick(emailAccountId, blogId, article.articleId)
                }
                sx={{
                  backgroundColor: theme.palette.openButton.main,
                  color: theme.palette.openButton.text, 
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
                  borderRadius: "4px", 
                  textAlign: "center", 
                  textTransform: "none", 
                  "&:hover": {
                    backgroundColor: theme.palette.openButton.hoverColor,
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

export default ReaderArticleCard;
