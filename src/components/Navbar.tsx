import * as React from "react";
import * as MUI from "../MUI/muiImports";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPage } from "../redux/pageSlice";

interface Props {
  toggleTheme: () => void;
}

const pages = [
  { name: "Change User", path: "/" },
  { name: "Author", path: "/author" },
  { name: "Reader", path: "/reader" },
];

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector((state) => state.page.selectedPage);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page: string) => {
    dispatch(setPage(page));
    handleCloseNavMenu();
  };

  return (
    <MUI.AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.navbar.main,
        borderColor: theme.palette.navbar.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px 0',
      }}
    >
      <MUI.Container maxWidth="xl">
        <MUI.Toolbar disableGutters>
          <MUI.Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MUI.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MUI.MenuIcon />
            </MUI.IconButton>
            <MUI.Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}

              slotProps={{
                paper: {
                  sx: {
                    bgcolor: theme.palette.navbar.main, // Set background color here
                  },
                },
              }}

            >
              {pages.map((page) => (
                // Mobile screen size drop down menu content Start
                <MUI.MenuItem
                  key={page.name}
                  onClick={() => handlePageClick(page.name)}
                  component={Link}
                  to={page.path}
                >
                  <MUI.Typography
                    textAlign="center"
                    sx={{
                      color:
                        selectedPage === page.name
                          ? theme.palette.navbar.selectedText
                          : theme.palette.navbar.text,
                    }}
                  >
                    {page.name}
                  </MUI.Typography>
                </MUI.MenuItem>
                // Mobile screen size drop down menu content End
              ))}
            </MUI.Menu>
          </MUI.Box>
          <MUI.Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <MUI.Button
                key={page.name}
                onClick={() => handlePageClick(page.name)}
                sx={{
                  my: 2,
                  color:
                    selectedPage === page.name
                      ? theme.palette.navbar.selectedText
                      : theme.palette.navbar.text,
                  display: "block",
                  "&:hover": { bgcolor: theme.palette.navbar.hover },
                }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </MUI.Button>
            ))}
          </MUI.Box>

          <MUI.Box sx={{ flexGrow: 0 }}>
            <MUI.Tooltip title="Toggle theme">
              <MUI.IconButton onClick={toggleTheme} sx={{ p: 0 }}>
                <MUI.Brightness4Icon />
              </MUI.IconButton>
            </MUI.Tooltip>
            <MUI.Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MUI.MenuItem
                onClick={() => {
                  toggleTheme();
                }}
              >
                <MUI.Typography textAlign="center"></MUI.Typography>
              </MUI.MenuItem>
            </MUI.Menu>
          </MUI.Box>
        </MUI.Toolbar>
      </MUI.Container>
    </MUI.AppBar>
  );
};

export default Navbar;
