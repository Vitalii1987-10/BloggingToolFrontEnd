import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Purpose: This component renders an edit button which, when clicked, navigates to the article editing page for the specified article.

interface EditArticleButtonProps {
  emailAccountId: number; // ID of the email account associated with the article
  blogId: number;         // ID of the blog that contains the article
  articleId: number;      // ID of the article to be edited
}

const EditArticleButton: React.FC<EditArticleButtonProps> = ({ emailAccountId, blogId, articleId }) => {
  const theme = useTheme(); // Hook to access the theme object
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // Function to handle button click and navigate to the edit article page
  const handleClick = async () => {
    navigate(`/author/${emailAccountId}/blog/${blogId}/article/${articleId}/edit`);
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      className='edit-article-button'
      sx={{
        backgroundColor: theme.palette.editButton.main,
        color: theme.palette.editButton.text,
        borderColor: theme.palette.editButton.borderColor,
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
          backgroundColor: theme.palette.editButton.hoverColor
        },
      }}
    >
      Edit
    </MUI.Button>
  );
};

export default EditArticleButton;
