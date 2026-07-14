import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [], //admin purpose
  publicBooks: [],
  selectedBook: {},
  cart: [],
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
    setSelectedBook: (state, { payload }) => {
      state.selectedBook = payload || {};
    },
    setCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
  },
});

const { reducer, actions } = bookSlice;
export const { setBook, setPublicBook, setSelectedBook, setCart } = actions;
export default reducer;
