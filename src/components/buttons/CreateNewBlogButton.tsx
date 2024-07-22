import React from 'react';
import * as MUI from "../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Purpose: This component renders a button that, when clicked, navigates to the page for creating a new blog.

interface CreateNewBlogButtonProps {
  emailAccountId: number; // ID of the email account for which the new blog will be created
}

const CreateNewBlogButton: React.FC<CreateNewBlogButtonProps> = ({ emailAccountId }) => {
  const theme = useTheme(); // Hook to access the theme object
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle button click and navigate to the new blog creation page
  const handleClick = () => {
    const url = `/author/${emailAccountId}/create-new-blog`; // Generate the URL for creating a new blog
    navigate(url); // Navigate to the new blog creation page
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.createNewBlogButton.main,
        color: theme.palette.createNewBlogButton.text,
        borderColor: theme.palette.createNewBlogButton.borderColor,
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
          backgroundColor: theme.palette.createNewBlogButton.hoverColor
        },
      }}
    >
      Create New Blog
    </MUI.Button>
  );
};

export default CreateNewBlogButton;
