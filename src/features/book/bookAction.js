import {
  adminFetchAllBookAPI,
  fetchAllPublicBookAPI,
  postNewBookAPI,
} from "./bookAPI";
import { setBook, setPublicBook } from "./bookSlice";

//!create new book
export const postNewBookAction = (payload) => async (dispatch) => {
  const book = await postNewBookAPI(payload);
  console.log(book);
  if (book?.status === "success") {
    dispatch(adminFetchAllBookAction());
  }
  return book;
};

//!Fetch all books
export const adminFetchAllBookAction = () => async (dispatch) => {
  const { status, payload } = await adminFetchAllBookAPI();
  status === "success" && dispatch(setBook(payload));
};

//!Fetch all public books
export const fetchAllPublicBookAction = () => async (dispatch) => {
  const { status, payload } = await fetchAllPublicBookAPI();
  status === "success" && dispatch(setPublicBook(payload));
};
