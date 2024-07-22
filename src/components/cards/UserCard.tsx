import * as React from "react";
import * as MUI from "../../MUI/muiImports";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "../../redux/hooks";
import { setPage } from "../../redux/pageSlice";

// Define an interface for EmailAccount
interface EmailAccount {
  emailAccountId: number; // Unique identifier for the email account
  emailAddress: string; // Email address of the account
}

interface User {
  userId: number; // Unique identifier for the user
  userName: string; // Name of the user
  emailAccounts: EmailAccount[]; // Array of email accounts associated with the user
}

interface UserCardListProps {
  users: User[]; // Array of user objects to display
  toggleUser: (emailAccountId: number) => void; // Function to handle user selection
}

const UserCard: React.FC<UserCardListProps> = ({ users, toggleUser }) => {
  const dispatch = useAppDispatch(); // Hook to dispatch actions to Redux store
  const navigate = useNavigate(); // Hook to programmatically navigate
  const theme = useTheme(); // Hook to access the theme object for styling

  // Handler function for navigating to the author's blogs page and updating local storage and Redux state
  const handleEmailAccountClick = (emailAccountId: number) => {
    localStorage.setItem("emailAccountId", emailAccountId.toString()); // Save email account ID to local storage
    localStorage.setItem("isLogged", "true"); // Set user logged status in local storage
    toggleUser(emailAccountId); // Call the function passed via props to handle user selection

    dispatch(setPage("Author")); // Update the page state in Redux store
    navigate(`/author/${emailAccountId}/blogs`); // Navigate to the author's blogs page
  };

  return (
    <MUI.Grid container spacing={2}>
      {users.map((user) => (
        <React.Fragment key={user.userId}>
          {user.emailAccounts.map((emailAccount) => (
            <MUI.Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={emailAccount.emailAccountId}
            >
              <MUI.Card
                sx={{
                  minWidth: {
                    xs: 240, // Small mobile devices
                    sm: 280, // Extra small screens
                    md: 300, // Small screens
                    lg: 320, // Medium screens
                    xl: 340 // Large screens and up
                  },
                  maxWidth: "100%", // Allow card to take full width on smaller screens
                  bgcolor: theme.palette.card.main,
                  borderColor: theme.palette.card.borderColor,
                  borderStyle: "solid",
                  borderWidth: "1px 0",
                }}
              >
                <MUI.CardContent>
                  <MUI.Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      marginLeft: 1,
                      color: theme.palette.card.text,
                    }}
                  >
                    {user.userName} {/* Display user name */}
                  </MUI.Typography>
                  <MUI.Typography
                    variant="body1"
                    sx={{ marginLeft: 1, color: theme.palette.card.text }}
                  >
                    {emailAccount.emailAddress} {/* Display email address */}
                  </MUI.Typography>
                  <MUI.Box mt={2} display="flex" justifyContent="center">
                    <MUI.Button
                      variant="text"
                      onClick={() =>
                        handleEmailAccountClick(emailAccount.emailAccountId) // Handle button click
                      }
                      sx={{
                        backgroundColor: theme.palette.openButton.main,
                        color: theme.palette.openButton.text, 
                        fontSize: {
                          xs: '10px', // Font size for smaller mobile devices (extra small)
                          sm: '14px', // Font size for small screens
                          md: '14px', // Font size for medium screens
                          lg: '16px', // Font size for large screens
                          xl: '18px' // Font size for extra large screens
                        },
                        minWidth: {
                          xs: '70px',  // Size for smaller mobile devices (extra small)
                          sm: '90px',  // Size for small screens
                          md: '90px',  // Size for medium screens
                          lg: '100px',  // Size for large screens
                          xl: '120px' // Size for extra large screens and up
                        },
                        borderColor: theme.palette.openButton.borderColor,
                        borderStyle: "solid",
                        borderWidth: "1px 0",
                        borderRadius: "4px", // Border radius of the button
                        textAlign: "center", // Center align text
                        textTransform: "none", // Preserve case
                        "&:hover": {
                          backgroundColor: theme.palette.openButton.hoverColor, // Hover background color
                        },
                      }}
                    >
                      Open
                    </MUI.Button>
                  </MUI.Box>
                </MUI.CardContent>
              </MUI.Card>
            </MUI.Grid>
          ))}
        </React.Fragment>
      ))}
    </MUI.Grid>
  );
};

export default UserCard;
