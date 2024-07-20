import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { unpublishArticle } from '../../../redux/articles/articlesSlice';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; // Import the custom hook for dispatch

interface UnpublishArticleButtonProps {
  emailAccountId: number;
  blogId: number;
  articleId: number;
  fetchArticles: () => void;
}

const UnpublishArticleButton: React.FC<UnpublishArticleButtonProps> = ({ emailAccountId, blogId, articleId, fetchArticles }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      await dispatch(unpublishArticle({ emailAccountId, blogId, articleId })).unwrap();
      fetchArticles();
    } catch (error) {
      console.error("Failed to publish article:", error);
    }
  };

  return (
    <MUI.Button
      variant="text"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.unpublishButton.main,
        color: theme.palette.unpublishButton.text,
        minWidth: 100,
        borderColor: theme.palette.unpublishButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
        "&:hover": {
          backgroundColor: theme.palette.unpublishButton.hoverColor
        },
      }}
    >
      Unpublish
    </MUI.Button>
  );
};

export default UnpublishArticleButton;
