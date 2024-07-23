import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Purpose: This component renders a button that, when clicked, navigates to the blog editing page.

interface EditButtonProps {
  emailAccountId: number; // ID of the email account associated with the blog
  blogId: number;         // ID of the blog to be edited
}

const EditBlogButton: React.FC<EditButtonProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme(); // Hook to access the theme object
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle button click and navigate to the edit page
  const handleClick = () => {
    navigate(`/author/${emailAccountId}/blog/${blogId}/edit`); // Navigate to the edit page for the specified blog
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      className="edit-blog-button"
      sx={{
        backgroundColor: theme.palette.editButton.main,
        color: theme.palette.editButton.text,
        borderColor: theme.palette.editButton.borderColor,
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
          backgroundColor: theme.palette.editButton.hoverColor
        },
      }}
    >
      Edit
    </MUI.Button>
  );
};

export default EditBlogButton;
