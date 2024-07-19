import * as React from "react";
import * as MUI from "../../MUI/muiImports";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "../../redux/hooks";
import { setPage } from "../../redux/pageSlice";
import ToArticlesButton from "../buttons/BlogCardButtons/ToArticlesButton";
import DeleteBlogButton from "../buttons/BlogCardButtons/DeleteBlogButton";
import EditBlogButton from "../buttons/BlogCardButtons/EditBlogButton";

interface Blog {
  blogId: number;
  blogTitle: string;
  blogCategory: string;
}

interface BlogsCardProps {
  emailAccountId: number;
  blogs: Blog[];
}

const BlogsCard: React.FC<BlogsCardProps> = ({ emailAccountId, blogs }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <MUI.Grid container spacing={2}>
      {blogs.map((blog) => (
        <MUI.Grid item xs={12} sm={6} md={4} key={blog.blogId}>
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
                sx={{ mb: 1, marginLeft: 1, color: theme.palette.card.text, display: "flex", justifyContent: "center" }}
              >
                {blog.blogTitle}
              </MUI.Typography>
              <MUI.Typography
                variant="body1"
                sx={{ marginLeft: 1, color: theme.palette.card.text, display: "flex", justifyContent: "center" }}
              >
                {blog.blogCategory}
              </MUI.Typography>
            </MUI.CardContent>

            <MUI.Divider orientation="horizontal" flexItem />

            <MUI.CardActions>

              <MUI.Grid container sx={{justifyContent: "center"}}>
                <MUI.Grid item xs={6}>
                  <ToArticlesButton blogId={blog.blogId} />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container sx={{justifyContent: "center"}}>
                <MUI.Grid item xs={6}>
                  <DeleteBlogButton emailAccountId={emailAccountId} blogId={blog.blogId} />
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>

            <MUI.CardActions>
              <MUI.Grid container sx={{justifyContent: "center"}}>
                <MUI.Grid item xs={6}>
                  <EditBlogButton  emailAccountId={emailAccountId} blogId={blog.blogId} />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid container>
                <MUI.Grid item xs={6}>
                </MUI.Grid>
              </MUI.Grid>
            </MUI.CardActions>
          </MUI.Card>
        </MUI.Grid>
      ))}
    </MUI.Grid>
  );
};

export default BlogsCard;
