import * as React from 'react';
import * as MUI from "../MUI/muiImports"; // Importing Material-UI components and styles
import { useTheme } from '@mui/material'; // Hook to access theme values

// Define the interface for the props of the MainContentArea component
interface MainContentAreaProps {
  children: React.ReactNode; // The content to be rendered inside the main content area
}

// Functional component for rendering the main content area with specific styles
const MainContentArea: React.FC<MainContentAreaProps> = ({ children }) => {
  const theme = useTheme(); // Hook to access the Material-UI theme

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
      {children} {/* Render the children passed as props */}
    </MUI.Box>
  );
};

export default MainContentArea;
