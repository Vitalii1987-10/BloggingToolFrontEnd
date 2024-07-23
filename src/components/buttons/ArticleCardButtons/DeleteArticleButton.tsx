import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch
import { deleteArticle } from '../../../redux/articles/articlesSlice';

// Purpose: This component renders a delete button which, when clicked, dispatches an action to delete the specified article. 
// After successful deletion, it alerts the user and triggers a callback to refresh the list of articles.

interface DeleteArticleProps {
  emailAccountId: number;
  blogId: number;
  articleId: number;
  fetchArticles: () => void; // Function to refresh the list of articles
}

const DeleteArticleButton: React.FC<DeleteArticleProps> = ({ emailAccountId, blogId, articleId, fetchArticles }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch(); // Use the custom hook for dispatch

  // Function to handle button click and delete the article
  const handleClick = async () => {
    try {
      // Dispatch the deleteArticle thunk with the required parameters and handle the response
      await dispatch(deleteArticle({ emailAccountId, blogId, articleId })).unwrap();
      alert('Article deleted successfully!'); // Show success alert
      fetchArticles(); // Refresh the list of articles
    } catch (err) {
      console.error('Failed to delete the article: ', err); // Log error to console
      alert('Failed to delete the article'); // Show error alert
    }
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      className='delete-article-button'
      sx={{
        backgroundColor: theme.palette.deleteButton.main,
        color: theme.palette.deleteButton.text,
        borderColor: theme.palette.deleteButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
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
        "&:hover": {
          backgroundColor: theme.palette.deleteButton.hoverColor
        },
      }}
    >
      Delete
    </MUI.Button>
  );
};

export default DeleteArticleButton;
