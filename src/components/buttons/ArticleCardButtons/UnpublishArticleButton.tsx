import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { unpublishArticle } from '../../../redux/articles/articlesSlice';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch

// Purpose: This component renders a button that, when clicked, unpublishes an article.

interface UnpublishArticleButtonProps {
  emailAccountId: number; // ID of the email account associated with the article
  blogId: number;         // ID of the blog that contains the article
  articleId: number;      // ID of the article to unpublish
  fetchArticles: () => void; // Function to refresh the list of articles after unpublishing
}

const UnpublishArticleButton: React.FC<UnpublishArticleButtonProps> = ({ emailAccountId, blogId, articleId, fetchArticles }) => {
  const theme = useTheme(); // Hook to access the theme object
  const dispatch = useAppDispatch(); // Use the custom hook for dispatch

  // Function to handle button click and unpublish the article
  const handleClick = async () => {
    try {
      await dispatch(unpublishArticle({ emailAccountId, blogId, articleId })).unwrap(); // Dispatch the action to unpublish the article
      fetchArticles(); // Refresh the list of articles
    } catch (error) {
      console.error("Failed to unpublish article:", error); // Log error if action fails
    }
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.unpublishButton.main,
        color: theme.palette.unpublishButton.text,
        borderColor: theme.palette.unpublishButton.borderColor,
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
          backgroundColor: theme.palette.unpublishButton.hoverColor
        },
      }}
    >
      Unpublish
    </MUI.Button>
  );
};

export default UnpublishArticleButton;
