import { toast } from "react-toastify";
import { fetchAllReviewAPI, postnewReviewApi } from "./ReviewAPI";
import { setModalShow } from "@features/system/systemSlice";
import { getAllBorrowsAction } from "@features/borrow/borrowAction";
import { setAllreview } from "./reviewSlice";

//!get all reviews
export const getAllReviewAction = (isAdmin) => async (dispatch) => {
  const pending = fetchAllReviewAPI(isAdmin);
  toast.promise(pending, {
    pending: "Please wait",
  });
  const { status, message, payload } = await pending;
  toast[status](message);
  status === "success" && dispatch(setAllreview(payload));
};

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
