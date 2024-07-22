import * as React from "react";
import * as MUI from "../../../MUI/muiImports";
import PublishArticleButton from "../../buttons/ArticleCardButtons/PublishArticleButton";
import DeleteArticleButton from "../../buttons/ArticleCardButtons/DeleteArticleButton";
import EditArticleButton from "../../buttons/ArticleCardButtons/EditArticleButton";
import { useTheme } from "@mui/material/styles";

// Purpose: This component renders a card for each article in the draft state, showing its details and providing action buttons.

interface Article {
  articleId: number; // Unique identifier for the article
  articleTitle: string; // Title of the article
  createdTimestamp: string; // Timestamp when the article was created
  updatedTimestamp: string; // Timestamp when the article was last modified
  publishedTimestamp: string; // Timestamp when the article was last published
}

interface ArticlesDraftCardProps {
  emailAccountId: number; // ID of the email account owning the articles
  blogId: number; // ID of the blog to which the articles belong
  articles: Article[]; // Array of article objects to display
  fetchArticles: () => void; // Function to fetch the latest articles
}

const ArticlesDraftCard: React.FC<ArticlesDraftCardProps> = ({
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
                  Created: {article.createdTimestamp}
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
                  Last Modified: {article.updatedTimestamp}
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
                  Last Published: {article.publishedTimestamp}
                </MUI.Typography>
              </MUI.Box>
            </MUI.CardContent>

            <MUI.Divider orientation="horizontal" flexItem />

            <MUI.CardActions>
              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <PublishArticleButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for publishing the article
                    blogId={blogId} // Pass blogId for publishing the article
                    articleId={article.articleId} // Pass articleId to identify which article to publish
                    fetchArticles={fetchArticles} // Function to refetch articles after publishing
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <DeleteArticleButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for deleting the article
                    blogId={blogId} // Pass blogId for deleting the article
                    articleId={article.articleId} // Pass articleId to identify which article to delete
                    fetchArticles={fetchArticles} // Function to refetch articles after deleting
                  />
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>

            <MUI.CardActions>
              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <EditArticleButton
                    emailAccountId={emailAccountId} // Pass emailAccountId for editing the article
                    blogId={blogId} // Pass blogId for editing the article
                    articleId={article.articleId} // Pass articleId to identify which article to edit
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container>
                <MUI.Grid item xs={6}></MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>
          </MUI.Card>
        </MUI.Grid>
      ))}
    </MUI.Grid>
  );
};

export default ArticlesDraftCard;
