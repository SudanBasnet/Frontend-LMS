import { toast } from "react-toastify";
import { postnewReviewApi } from "./ReviewAPI";
import { setModalShow } from "@features/system/systemSlice";
import { getAllBorrowsAction } from "@features/borrow/borrowAction";

//!return borrowed book
export const postNewReviewAction = (payload) => async (dispatch) => {
  const pending = postnewReviewApi(payload);
  toast.promise(pending, {
    pending: "Please wait",
  });
  const { status, message } = await pending;
  toast[status](message);
  //TODO remove the form

  if (status === "success") {
    dispatch(setModalShow(false));
    dispatch(getAllBorrowsAction());
  }
};
