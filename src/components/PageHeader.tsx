import * as MUI from "../MUI/muiImports";
import { styled } from "@mui/system";

interface PageHeaderProps {
  title: string;
}

const HeaderContainer = styled(MUI.Box)({
  marginTop: "5px",
  marginBottom: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <HeaderContainer>
      <MUI.Typography variant="h4" component="h1" gutterBottom>
        {title}
      </MUI.Typography>
    </HeaderContainer>
  );
};

export default PageHeader;