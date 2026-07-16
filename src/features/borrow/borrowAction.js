import { toast } from "react-toastify";
import { fetchAllBorrowsAPI, patchReturnBorrowApi } from "./borrowAPI";
import { setAllBorrow, setMyBorrow } from "./borrowSlice";

//!get borrow book
export const getAllBorrowsAction = (isAdmin) => async (dispatch) => {
  const pending = fetchAllBorrowsAPI(isAdmin);
  toast.promise(pending, {
    pending: "Please wait",
  });
  const { payload } = await pending;

  isAdmin ? dispatch(setAllBorrow(payload)) : dispatch(setMyBorrow(payload));
};

//!return borrowed book
export const returnBorrowsAction = (payload) => async (dispatch) => {
  const pending = patchReturnBorrowApi(payload);
  toast.promise(pending, {
    pending: "Please wait",
  });
  const { status, message } = await pending;
  toast[status](message);

  status === "success" && dispatch(getAllBorrowsAction());
};
