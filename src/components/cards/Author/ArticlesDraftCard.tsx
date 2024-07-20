import * as React from "react";
import * as MUI from "../../../MUI/muiImports";
import PublishArticleButton from "../../buttons/ArticleCardButtons/PublishArticleButton";
import DeleteArticleButton from "../../buttons/ArticleCardButtons/DeleteArticleButton";
import EditArticleButton from "../../buttons/ArticleCardButtons/EditArticleButton";
import { useTheme } from "@mui/material/styles";

interface Article {
  articleId: number;
  articleTitle: string;
  createdTimestamp: string;
  updatedTimestamp: string;
  publishedTimestamp: string;
}

interface ArticlesDraftCardProps {
  emailAccountId: number;
  blogId: number;
  articles: Article[];
  fetchArticles: () => void;
}

const ArticlesDraftCard: React.FC<ArticlesDraftCardProps> = ({
  emailAccountId,
  blogId,
  articles,
  fetchArticles,
}) => {
  const theme = useTheme();

  return (
    <MUI.Grid container spacing={2}>
      {articles.map((article) => (
        <MUI.Grid item xs={12} sm={6} md={4} key={article.articleId}>
          <MUI.Card
            sx={{
              minWidth: 220,
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
                    emailAccountId={emailAccountId}
                    blogId={blogId}
                    articleId={article.articleId}
                    fetchArticles={fetchArticles}
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <DeleteArticleButton
                    emailAccountId={emailAccountId}
                    blogId={blogId}
                  />
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>

            <MUI.CardActions>
              <MUI.Grid container sx={{ justifyContent: "center" }}>
                <MUI.Grid item xs={6}>
                  <EditArticleButton
                    emailAccountId={emailAccountId}
                    blogId={blogId}
                    articleId={article.articleId}
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
