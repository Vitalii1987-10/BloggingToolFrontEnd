import React from 'react';
import * as MUI from "../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface CreateNewBlogButtonProps {
  emailAccountId: number;
}

const CreateNewBlogButton: React.FC<CreateNewBlogButtonProps> = ({ emailAccountId }) => {
  const theme = useTheme();
  const navigate = useNavigate(); 

  const handleClick = () => {
    const url = `/author/${emailAccountId}/create-new-blog`; // Generate the URL
    navigate(url); // Navigate to the URL
  };

  return (
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.createNewBlogButton.main,
        color: theme.palette.createNewBlogButton.text,
        minWidth: 100,
        borderColor: theme.palette.createNewBlogButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: '4px',
        textAlign: 'center',
        textTransform: 'none',
        boxShadow: 1,
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
