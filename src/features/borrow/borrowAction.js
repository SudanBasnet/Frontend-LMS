import { toast } from "react-toastify";
import { fetchAllBorrowsAPI } from "./borrowAPI";
import { setAllBorrow, setMyBorrow } from "./borrowSlice";

//!get borrow book
export const getAllBorrowsAction = (isAdmin) => async (dispatch) => {
  const pending = fetchAllBorrowsAPI(isAdmin);
  toast.promise(pending, {
    pending: "Please wait",
  });
  const { status, payload, message } = await pending;
  console.log(status, payload, message);
  isAdmin ? dispatch(setAllBorrow(payload)) : dispatch(setMyBorrow(payload));
};
