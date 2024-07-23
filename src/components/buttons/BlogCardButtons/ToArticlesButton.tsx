import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Purpose: This component renders a button that, when clicked, navigates to the articles page for a specific blog.

interface ToArticlesButtonProps {
  emailAccountId: number; // ID of the email account associated with the blog
  blogId: number;         // ID of the blog to navigate to the articles page
}

const ToArticlesButton: React.FC<ToArticlesButtonProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme(); // Hook to access the theme object
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle button click and navigate to the articles page
  const handleClick = () => {
    // Navigate to the articles page for the specified blog
    navigate(`/author/${emailAccountId}/blog/${blogId}/articles`);
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      className="to-articles-button"
      sx={{
        backgroundColor: theme.palette.toArticlesButton.main,
        color: theme.palette.toArticlesButton.text,
        borderColor: theme.palette.toArticlesButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: '4px',
        textAlign: 'center',
        textTransform: 'none',
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
          backgroundColor: theme.palette.toArticlesButton.hoverColor,
        },
      }}
    >
      To Articles
    </MUI.Button>
  );
};

export default ToArticlesButton;
