import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

interface EditArticleButtonProps {
  emailAccountId: number;
  blogId: number;
  articleId: number;
}

const EditArticleButton: React.FC<EditArticleButtonProps> = ({ emailAccountId, blogId, articleId }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate(`/author/${emailAccountId}/blog/${blogId}/article/${articleId}/edit`);
  };

  return (
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.editButton.main,
        color: theme.palette.editButton.text,
        minWidth: 100,
        borderColor: theme.palette.editButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
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
