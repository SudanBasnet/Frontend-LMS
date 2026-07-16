import { toast } from "react-toastify";
import { fetchAllBorrowsAPI } from "./borrowAPI";
import { setAllBorrow } from "./borrowSlice";

//!get borrow book
export const getAllBorrowsAction = () => async (dispatch) => {
  const pending = fetchAllBorrowsAPI();
  toast.promise(pending, {
    pending: "Please wait",
  });
  const { status, payload, message } = await pending;
  console.log(status, payload, message);
  dispatch(setAllBorrow(payload));
};
