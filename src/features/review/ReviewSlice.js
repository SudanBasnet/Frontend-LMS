import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBorrows: [],
  myBorrows: [],
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    setAllBorrow: (state, { payload }) => {
      state.allBorrows = payload;
    },
    setMyBorrow: (state, { payload }) => {
      state.myBorrows = payload;
    },
  },
});

const { reducer, actions } = borrowSlice;
export const { setAllBorrow, setMyBorrow } = actions;
export default reducer;
