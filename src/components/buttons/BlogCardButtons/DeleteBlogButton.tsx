import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { deleteBlogById } from '../../../redux/blogs/blogsSlice';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch

// Purpose: This component renders a button that, when clicked, deletes a blog.

interface DeleteButtonProps {
  emailAccountId: number; // ID of the email account associated with the blog
  blogId: number;         // ID of the blog to delete
}

const DeleteBlogButton: React.FC<DeleteButtonProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme(); // Hook to access the theme object
  const dispatch = useAppDispatch(); // Use the custom hook for dispatch

  // Function to handle button click and delete the blog
  const handleClick = async () => {
    try {
      await dispatch(deleteBlogById({ emailAccountId, blogId })).unwrap(); // Dispatch the action to delete the blog
    } catch (error) {
      console.error(`Failed to delete blog ${blogId}:`, error); // Handle and log error if action fails
    }
  };

  return (
    // MUI Button with styles and click handler
    <MUI.Button
      variant="text"
      onClick={handleClick}
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

export default DeleteBlogButton;
