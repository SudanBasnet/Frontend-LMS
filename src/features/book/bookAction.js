import { adminFetchAllBookAPI, postNewBookAPI } from "./bookAPI";
import { setBook } from "./bookSlice";

//!create new book
export const postNewBookAction = async (payload) => {
  const book = await postNewBookAPI(payload);
  console.log(book);
};

//!Fetch all books
export const adminFetchAllBookAction = () => async (dispatch) => {
  const { status, payload } = await adminFetchAllBookAPI();
  status === "success" && dispatch(setBook(payload));
};
