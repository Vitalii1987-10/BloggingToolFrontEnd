import * as MUI from "../MUI/muiImports"; // Importing Material-UI components and styles
import { styled } from "@mui/system"; // Importing styled utility for custom styles

// Define the interface for the PageHeader component props
interface PageHeaderProps {
  title: string; // Title text to be displayed in the header
}

// Create a styled container for the header
const HeaderContainer = styled(MUI.Box)({
  marginTop: "5px", 
  marginBottom: "5px", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center" 
});

// Functional component for rendering the page header
const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <HeaderContainer>
      <MUI.Typography variant="h4" component="h1" gutterBottom>
        {title} {/* Display the title passed as a prop */}
      </MUI.Typography>
    </HeaderContainer>
  );
};

export default PageHeader;
