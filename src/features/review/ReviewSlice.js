import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setAllreview: (state, { payload }) => {
      state.reviews = payload;
    },
  },
});

const { reducer, actions } = reviewSlice;
export const { setAllreview } = actions;
export default reducer;
