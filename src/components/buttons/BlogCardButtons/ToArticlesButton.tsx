// ToArticlesButton.tsx
import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';

interface ToArticlesButtonProps {
  blogId: number;
}

const ToArticlesButton: React.FC<ToArticlesButtonProps> = ({ blogId }) => {
  const theme = useTheme();

  const handleClick = () => {
    // Navigate to articles page or perform action
    console.log(`Navigating to articles for blog ${blogId}`);
  };

  return (
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.toArticlesButton.main,
        color: theme.palette.toArticlesButton.text,
        minWidth: 100,
        borderColor: theme.palette.toArticlesButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
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
