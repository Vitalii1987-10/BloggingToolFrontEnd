import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch

interface ShareArticleButtonProps {
  emailAccountId: number;
  blogId: number;
}

const ShareArticleButton: React.FC<ShareArticleButtonProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = async () => {

  };

  return (
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.shareButton.main,
        color: theme.palette.shareButton.text,
        minWidth: 100,
        borderColor: theme.palette.shareButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
        "&:hover": {
          backgroundColor: theme.palette.shareButton.hoverColor
        },
      }}
    >
      Share Article
    </MUI.Button>
  );
};

export default ShareArticleButton;
