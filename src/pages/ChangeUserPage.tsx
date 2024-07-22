import * as MUI from "../MUI/muiImports";
import PageHeader from "../components/PageHeader";
import UserCard from "../components/cards/UserCard";
import { useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/users/usersSlice';
import { RootState, AppDispatch } from '../redux/store';
import { setPage } from "../redux/pageSlice";

// Define the Props interface for the ChangeUser component
interface Props {
  toggleUser: (emailAccountId: number) => void;
}

// ChangeUser component definition
const ChangeUser: React.FC<Props> = ({ toggleUser }) => {
  // Access the current theme
  const theme = useTheme();
  // Access the users state from Redux
  const { users } = useSelector((state: RootState) => state.users);
  // Initialize the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Fetch all users when the component mounts
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Set the page type to "Change User" when the component mounts
  React.useEffect(() => {
    dispatch(setPage("Change User"));
  }, [dispatch]);

  // Render the ChangeUser component
  return (
    <MUI.Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        p: 2,
        bgcolor: theme.palette.mainContentArea.main,
        borderColor: theme.palette.mainContentArea.borderColor,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderTopLeftRadius: '8px', 
        borderTopRightRadius: '8px', 
      }}
    >
      {/* Page header for choosing a user */}
      <PageHeader title="Choose a User" />
      {/* UserCard component to display users and handle user selection */}
      <UserCard users={users} toggleUser={toggleUser} />
    </MUI.Box>
  );
};

export default ChangeUser;
