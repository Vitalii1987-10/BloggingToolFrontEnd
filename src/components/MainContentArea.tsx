import * as React from 'react';
import * as MUI from "../MUI/muiImports"
import { useTheme } from '@mui/material';

interface MainContentAreaProps {
  children: React.ReactNode;
}

const MainContentArea: React.FC<MainContentAreaProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <MUI.Box
      sx={{
        width: '100%',
        minHeight: '93.2vh',
        p: 2,
        mt: 1,
        bgcolor: theme.palette.mainContentArea.main,
        borderColor: theme.palette.mainContentArea.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderTopLeftRadius: '8px', 
        borderTopRightRadius: '8px', 
      }}
    >
      {children}
    </MUI.Box>
  );
};

export default MainContentArea;
