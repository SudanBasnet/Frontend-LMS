import {
  adminFetchAllBookAPI,
  fetchAllPublicBookAPI,
  fetchsinglePublicBookAPI,
  postNewBookAPI,
} from "./bookAPI";
import { setBook, setPublicBook, setSelectedBook } from "./bookSlice";

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

//!Fetch single public books
export const fetchSinglePublicBookAction = (slug) => async (dispatch) => {
  const { status, payload } = await fetchsinglePublicBookAPI(slug);
  status === "success" && dispatch(setSelectedBook(payload));
};
