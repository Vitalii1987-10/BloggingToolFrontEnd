import MainContentArea from "../components/MainContentArea";
import PageHeader from "../components/PageHeader";
import UserCard from "../components/cards/UserCard";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/users/usersSlice';
import { RootState, AppDispatch } from '../redux/store';
import { setPage } from "../redux/pageSlice";

const ChangeUser = () => {

  const dispatch: AppDispatch = useDispatch();
  const { users} = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setPage("Change User"));
  }, [dispatch]);

  // console log users array. Need to delete when the app is finished.
  // useEffect(() => {
  //   if (users.length > 0) {
  //     console.log(users);
  //   }
  // }, [users]);

  return (
    <MainContentArea>
      <PageHeader title="Choose a User"></PageHeader>
      <UserCard users={users} />
    </MainContentArea>
  );
};

export default ChangeUser;
