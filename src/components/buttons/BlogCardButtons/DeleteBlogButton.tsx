import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { deleteBlogById } from '../../../redux/blogs/blogsSlice';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch

interface DeleteButtonProps {
  emailAccountId: number;
  blogId: number;
}

const DeleteBlogButton: React.FC<DeleteButtonProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = async () => {

    // console.log(emailAccountId, blogId)
    try {
      // Call the deleteBlogById action
      await dispatch(deleteBlogById({ emailAccountId, blogId })).unwrap();
      // Optionally, you can provide feedback to the user
      console.log(`Blog ${blogId} deleted successfully.`);
    } catch (error) {
      // Handle the error
      console.error(`Failed to delete blog ${blogId}:`, error);
    }
  };

  return (
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.deleteButton.main,
        color: theme.palette.deleteButton.text,
        minWidth: 100,
        borderColor: theme.palette.deleteButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
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
