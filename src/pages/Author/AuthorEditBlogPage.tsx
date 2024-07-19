import React, { useEffect, useState } from 'react';
import * as MUI from "../../MUI/muiImports";
import MainContentArea from "../../components/MainContentArea";
import PageHeader from "../../components/PageHeader";
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getBlogById } from '../../redux/blogs/blogsSlice';
import { useNavigate } from 'react-router-dom';
import { updateBlog } from '../../redux/blogs/blogsSlice';


interface BlogDto {
  blogTitle: string;
  blogAuthor: string;
  blogCategory: string;
}

const EditBlogPage: React.FC = () => {
  const { emailAccountId, blogId } = useParams<{ emailAccountId: string, blogId: string }>();
  const dispatch = useAppDispatch();
  const blog = useAppSelector((state) => state.blogs.blog);
  const theme = useTheme();
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (emailAccountId && blogId) {
      dispatch(getBlogById({ emailAccountId: Number(emailAccountId), blogId: Number(blogId) }));
    }
  }, [dispatch, emailAccountId, blogId]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.blogTitle || "");
      setAuthor(blog.blogAuthor || "");
      setCategory(blog.blogCategory || "");
    }
  }, [blog]);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const blogDto: BlogDto = {
      blogTitle: title,
      blogAuthor: author,
      blogCategory: category,
    };

    if (emailAccountId && blogId) {
      try {
        const resultAction = await dispatch(
          updateBlog({ emailAccountId: Number(emailAccountId), blogId: Number(blogId), blogDto })
        );

        if (updateBlog.fulfilled.match(resultAction)) {
          navigate(`/author/${emailAccountId}/blogs`); // Navigate only after successful update
        } else {
          console.error("Failed to update blog:", resultAction.payload);
        }
      } catch (error) {
        console.error("Failed to update blog:", error);
      }
    }
  };

  return (
    <MainContentArea>
      <PageHeader title="Edit Blog" />
      <MUI.Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: theme.palette.card.main,
          borderColor: theme.palette.card.borderColor,
          borderStyle: "solid",
          borderWidth: "1px 0",
        }}
      >
        <MUI.Typography variant="h5" sx={{ mb: 2 }}>
          Edit Blog
        </MUI.Typography>
        <form onSubmit={handleSubmit}>
          <MUI.TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MUI.TextField
            label="Author"
            fullWidth
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MUI.FormControl fullWidth required sx={{ mb: 2 }}>
            <MUI.InputLabel>Category</MUI.InputLabel>
            <MUI.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MUI.MenuItem value="Technology">Technology</MUI.MenuItem>
              <MUI.MenuItem value="Science">Science</MUI.MenuItem>
              <MUI.MenuItem value="Health">Health</MUI.MenuItem>
              <MUI.MenuItem value="Lifestyle">Lifestyle</MUI.MenuItem>
            </MUI.Select>
          </MUI.FormControl>

          <MUI.Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              mt: 2,
              backgroundColor: theme.palette.saveButton.main,
              color: theme.palette.saveButton.text,
              boxShadow: 1,
              "&:hover": {
                backgroundColor: theme.palette.toArticlesButton.hoverColor,
              },
              }}
            >
            Update Blog
          </MUI.Button>
        </form>
      </MUI.Paper>
    </MainContentArea>
  );
};

export default EditBlogPage;
