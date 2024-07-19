import * as React from "react";
import * as MUI from "../../MUI/muiImports";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "../../redux/hooks";
import { setPage } from "../../redux/pageSlice";

// Define an interface for EmailAccount
interface EmailAccount {
  emailAccountId: number;
  emailAddress: string;
}

interface User {
  userId: number;
  userName: string;
  emailAccounts: EmailAccount[];
}

interface UserCardListProps {
  users: User[];
}

const UserCard: React.FC<UserCardListProps> = ({ users }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleEmailAccountClick = (emailAccountId: number) => {
    dispatch(setPage("Author"))
    navigate(`/author/${emailAccountId}/blogs`);
  };

  return (
    <MUI.Grid container spacing={2}>
      {users.map((user) => (
        <React.Fragment key={user.userId}>
          {user.emailAccounts.map((emailAccount) => (
            <MUI.Grid item xs={12} sm={6} md={4} key={emailAccount.emailAccountId}>
              <MUI.Card
                sx={{
                  minWidth: 220, // Minimum width of the Card
                  maxWidth: '100%', // Allow card to take full width on smaller screens
                  bgcolor: theme.palette.card.main,
                  borderColor: theme.palette.card.borderColor,
                  borderStyle: 'solid',
                  borderWidth: '1px 0',
                }}
              >
                <MUI.CardContent>
                  <MUI.Typography variant="h5" sx={{ mb: 1, marginLeft: 1, color: theme.palette.card.text}}>{user.userName}</MUI.Typography>
                  <MUI.Typography variant="body1" sx={{ marginLeft: 1, color: theme.palette.card.text}}>{emailAccount.emailAddress}</MUI.Typography>
                  <MUI.Box mt={2} display="flex" justifyContent="center">
                    <MUI.Button
                      variant="text"
                      onClick={() =>
                        handleEmailAccountClick(emailAccount.emailAccountId)
                      }
                      sx={{
                        backgroundColor: theme.palette.openButton.main,
                        color: theme.palette.openButton.text, // Text color
                        minWidth: 100, // Minimum width of the button
                        borderColor: theme.palette.openButton.borderColor,
                        borderStyle: 'solid',
                        borderWidth: '1px 0',
                        borderRadius: "4px", // Border radius
                        textAlign: "center", // Center align text
                        textTransform: "none", // Preserve case
                        "&:hover": {
                          backgroundColor: theme.palette.openButton.hoverColor // Hover background color
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
