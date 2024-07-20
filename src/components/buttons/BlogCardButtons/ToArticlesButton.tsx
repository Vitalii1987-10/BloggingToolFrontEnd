// ToArticlesButton.tsx
import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface ToArticlesButtonProps {
  emailAccountId: number,
  blogId: number;
}

const ToArticlesButton: React.FC<ToArticlesButtonProps> = ({ emailAccountId, blogId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to articles page or perform action
    console.log(`Navigating to articles for blog ${blogId}`);
    navigate(`/author/${emailAccountId}/blog/${blogId}/articles`);
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
