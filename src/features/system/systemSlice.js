import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalShow: false,
  modalContent: {
    title: "",
    content: "",
  },
};

const modalSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setModalShow: (state, { payload }) => {
      state.modalShow = payload;
    },
    setModalContent: (state, { payload }) => {
      state.modalContent = payload;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { setModalShow, setModalContent } = actions;
export default reducer;
