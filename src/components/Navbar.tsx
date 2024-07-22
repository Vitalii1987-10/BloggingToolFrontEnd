import React, { useState } from "react";
import * as MUI from "../MUI/muiImports"; // Importing Material-UI components and styles
import { Link } from "react-router-dom"; // Importing Link for navigation
import { useTheme } from "@mui/material/styles"; // Hook to access theme values
import { useAppSelector } from "../redux/hooks"; // Hook to access Redux state

// Define the interface for the Navbar component props
interface Props {
  emailAccountId: number | null; // ID of the email account, which can be null
  toggleTheme: () => void; // Function to toggle the theme
  toggleLoggin: () => void; // Function to toggle login status
}

// Functional component for rendering the navigation bar
const Navbar: React.FC<Props> = ({ emailAccountId, toggleTheme, toggleLoggin }) => {
  const theme = useTheme(); // Hook to access the Material-UI theme
  const selectedPage = useAppSelector((state) => state.page.selectedPage); // Get the selected page from Redux state
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null); // State for navigation menu anchor element
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null); // State for user menu anchor element

  // Handler for opening the navigation menu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // Handler for closing the navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handler for closing the user menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handler for page navigation and user login status
  const handlePageClick = (page: string) => {
    if (page === "Change User") {
      // Remove emailAccountId and set isLogged to false
      localStorage.removeItem("emailAccountId");
      localStorage.setItem("isLogged", "false");
      toggleLoggin(); // Call function to toggle login status
    }

    handleCloseNavMenu(); // Close the navigation menu after handling the click
  };

  // Array of page links and their paths
  const pages = [
    { name: "Change User", path: "/" },
    { name: "Author", path: emailAccountId ? `/author/${emailAccountId}/blogs` : "/" },
    { name: "Reader", path: emailAccountId ? `/reader/${emailAccountId}/blogs` : "/" },
  ];

  return (
    <MUI.AppBar
      position="static"
      sx={{
        bgcolor: theme.palette.navbar.main, 
        borderColor: theme.palette.navbar.borderColor, 
        borderStyle: "solid", 
        borderWidth: "1px 0", 
      }}
    >
      <MUI.Container maxWidth="xl">
        <MUI.Toolbar disableGutters>
          {/* Mobile view menu button */}
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
                    bgcolor: theme.palette.navbar.main, 
                  },
                },
              }}
            >
              {pages.map((page) => (
                // Mobile screen size drop-down menu items
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
              ))}
            </MUI.Menu>
          </MUI.Box>
          {/* Desktop view navigation buttons */}
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

          {/* Theme toggle button */}
          <MUI.Box sx={{ flexGrow: 0 }}>
            <MUI.Tooltip title="Toggle theme">
              <MUI.IconButton onClick={toggleTheme} sx={{ p: 0 }}>
                <MUI.Brightness4Icon />
              </MUI.IconButton>
            </MUI.Tooltip>
            {/* User menu (currently not used) */}
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
                  toggleTheme(); // Toggle the theme when menu item is clicked
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
