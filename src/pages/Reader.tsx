import React from 'react';
import MainContentArea from "../components/MainContentArea";
import PageHeader from "../components/PageHeader";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setPage } from "../redux/pageSlice";

const Reader = () => {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPage("Reader"));
  }, [dispatch]);
  
  return (
    <MainContentArea>
      <PageHeader title="All Blogs"></PageHeader>
      <p>This is the reader page.</p>
    </MainContentArea>
  );
};

export default Reader;
