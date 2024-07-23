import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { publishArticle } from '../../../redux/articles/articlesSlice';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; 

// Purpose: This component renders a publish button which, when clicked, dispatches an action to publish the specified article.
// After successful publication, it triggers a callback to refresh the list of articles.

interface PublishArticleButtonProps {
  emailAccountId: number;
  blogId: number;
  articleId: number;
  fetchArticles: () => void; // Function to refresh the list of articles
}

const PublishArticleButton: React.FC<PublishArticleButtonProps> = ({ emailAccountId, blogId, articleId, fetchArticles }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch(); // Use the custom hook for dispatch

  // Function to handle button click and publish the article
  const handleClick = async () => {
    try {
      // Dispatch the publishArticle thunk with the required parameters and handle the response
      await dispatch(publishArticle({ emailAccountId, blogId, articleId })).unwrap();
      fetchArticles(); // Refresh the list of articles
    } catch (error) {
      console.error("Failed to publish article:", error); // Log error to console
    }
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      className='publish-article-button'
      sx={{
        backgroundColor: theme.palette.publishButton.main,
        color: theme.palette.publishButton.text,
        borderColor: theme.palette.publishButton.borderColor,
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
          backgroundColor: theme.palette.publishButton.hoverColor
        },
      }}
    >
      Publish
    </MUI.Button>
  );
};

export default PublishArticleButton;
