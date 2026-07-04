import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import bookReducer from "../features/book/bookSlice";

export default configureStore({
  reducer: {
    userInfo: userReducer,
    bookInfo: bookReducer,
  },
});
