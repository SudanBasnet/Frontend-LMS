import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  recentBorrow: [],
};

const bookSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    setrecentBorrow: (state, { payload }) => {
      state.recentBorrow = payload;
    },
    emptyrecentBorrow: (state) => {
      state.recentBorrow = [];
    },
    setRemoveBookFromCart: (state, { payload }) => {
      state.cart.filter((book) => book._id !== payload);
      state.cart = state.cart.filter((book) => book._id !== payload);
    },
  },
});

const { reducer, actions } = bookSlice;
export const {
  setCart,
  setRemoveBookFromCart,
  emptyCart,
  setrecentBorrow,
  emptyrecentBorrow,
} = actions;
export default reducer;
