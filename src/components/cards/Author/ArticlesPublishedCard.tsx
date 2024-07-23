import * as React from "react";
import * as MUI from "../../../MUI/muiImports";
import ShareArticleButton from "../../buttons/ArticleCardButtons/ShareArticle";
import UnpublishArticleButton from "../../buttons/ArticleCardButtons/UnpublishArticleButton";
import { useTheme } from "@mui/material/styles";

// Purpose: This component renders a card for each published article, showing its details and providing action buttons for sharing and unpublishing the article.

interface Article {
  articleId: number; // Unique identifier for the article
  articleTitle: string; // Title of the article
  publishedTimestamp: string; // Timestamp when the article was published
  articleViewsCount: number; // Total number of views for the article
}

interface ArticlesPublishedCardProps {
  emailAccountId: number; // ID of the email account owning the articles
  blogId: number; // ID of the blog to which the articles belong
  articles: Article[]; // Array of article objects to display
  fetchArticles: () => void; // Function to fetch the latest articles
}

const ArticlesPublishedCard: React.FC<ArticlesPublishedCardProps> = ({
  emailAccountId,
  blogId,
  articles,
  fetchArticles,
}) => {
  const theme = useTheme(); // Hook to access the theme object for styling

  return (
    <MUI.Grid container spacing={2}>
      {articles.map((article) => (
        <MUI.Grid item xs={12} sm={6} md={4} key={article.articleId}>
          <MUI.Card
            className="published-card"
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
              <MUI.Box sx={{ marginLeft: 2 }}>
                <MUI.Typography
                  variant="body1"
                  sx={{
                    marginLeft: 1,
                    color: theme.palette.card.text,
                    display: "flex",
                    justifyContent: "Left",
                  }}
                >
                  Published: {article.publishedTimestamp}
                </MUI.Typography>

                <MUI.Typography
                  variant="body1"
                  sx={{
                    marginLeft: 1,
                    color: theme.palette.card.text,
                    display: "flex",
                    justifyContent: "Left",
                  }}
                >
                  Total Views: {article.articleViewsCount}
                </MUI.Typography>
              </MUI.Box>
            </MUI.CardContent>

            <MUI.Divider orientation="horizontal" flexItem />

            <MUI.CardActions>
              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <ShareArticleButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for sharing the article
                    blogId={blogId} // Pass blogId for sharing the article
                    articleId={article.articleId} // Pass articleId to identify which article to share
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <UnpublishArticleButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for unpublishing the article
                    blogId={blogId} // Pass blogId for unpublishing the article
                    articleId={article.articleId} // Pass articleId to identify which article to unpublish
                    fetchArticles={fetchArticles} // Function to refetch articles after unpublishing
                  />
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>
          </MUI.Card>
        </MUI.Grid>
      ))}
    </MUI.Grid>
  );
};

export default ArticlesPublishedCard;
