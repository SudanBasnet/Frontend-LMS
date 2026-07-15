import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const bookSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    setRemoveBookFromCart: (state, { payload }) => {
      state.cart.filter((book) => book._id !== payload);
      state.cart = state.cart.filter((book) => book._id !== payload);
    },
  },
});

const { reducer, actions } = bookSlice;
export const { setCart, setRemoveBookFromCart } = actions;
export default reducer;
