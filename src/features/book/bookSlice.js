import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  publicBooks: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.books = action.payload;
    },
    setPublicBook: (state, action) => {
      state.publicBooks = action.payload;
    },
  },
});

const { reducer, actions } = bookSlice;
export const { setBook, setPublicBook } = actions;
export default reducer;
