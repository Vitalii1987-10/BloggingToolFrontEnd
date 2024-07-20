import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch

interface DeleteArticleProps {
  emailAccountId: number;
  blogId: number;
}

const DeleteArticleButton: React.FC<DeleteArticleProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
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

export default DeleteArticleButton;
