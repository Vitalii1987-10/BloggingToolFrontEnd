import React from 'react';
import * as MUI from "../../../MUI/muiImports";
import { publishArticle } from '../../../redux/articles/articlesSlice';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch } from '../../../redux/hooks'; 

interface PublishArticleButtonProps {
  emailAccountId: number;
  blogId: number;
  articleId: number;
  fetchArticles: () => void;
}

const PublishArticleButton: React.FC<PublishArticleButtonProps> = ({ emailAccountId, blogId, articleId, fetchArticles }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    try {
      await dispatch(publishArticle({ emailAccountId, blogId, articleId })).unwrap();
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
        backgroundColor: theme.palette.publishButton.main,
        color: theme.palette.publishButton.text,
        minWidth: 100,
        borderColor: theme.palette.publishButton.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
        borderRadius: "4px",
        textAlign: "center",
        textTransform: "none",
        boxShadow: 1,
        "&:hover": {
          backgroundColor: theme.palette.publishButton.hoverColor
        },
      }}
    >
      Publish
    </MUI.Button>
  );
};

export default PublishArticleButton;
