import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';

// Purpose: This component renders a button that, when clicked, copies the article URL to the clipboard.

interface ShareArticleButtonProps {
  emailAccountId: number; // ID of the email account associated with the article
  blogId: number;         // ID of the blog that contains the article
  articleId: number;      // ID of the article to share
}

const ShareArticleButton: React.FC<ShareArticleButtonProps> = ({ emailAccountId, blogId, articleId }) => {
  const theme = useTheme(); // Hook to access the theme object

  // Function to handle button click and copy URL to clipboard
  const handleClick = async () => {
    const url = `http://localhost:3000/reader/${emailAccountId}/blog/${blogId}/article/${articleId}`;
    try {
      await navigator.clipboard.writeText(url); // Copy the URL to clipboard
      alert('Article URL copied to clipboard!'); // Notify user of success
    } catch (err) {
      console.error('Failed to copy the URL: ', err); // Log error if copy fails
      alert('Failed to copy the URL'); // Notify user of failure
    }
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      className='share-article-button'
      sx={{
        backgroundColor: theme.palette.shareButton.main,
        color: theme.palette.shareButton.text,
        borderColor: theme.palette.shareButton.borderColor,
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
          backgroundColor: theme.palette.shareButton.hoverColor
        },
      }}
    >
      Share
    </MUI.Button>
  );
};

export default ShareArticleButton;
