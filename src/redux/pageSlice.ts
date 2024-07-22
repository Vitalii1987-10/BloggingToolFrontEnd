import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPage: 'Change User', // default selected page
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.selectedPage = action.payload;
      localStorage.setItem('selectedPage', action.payload);
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
