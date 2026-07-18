import { toast } from "react-toastify";
import {
  fetchAllReviewAPI,
  postnewReviewApi,
  updateReviewStatusAPI,
} from "./ReviewAPI";
import { setModalShow } from "@features/system/systemSlice";
import { getAllBorrowsAction } from "@features/borrow/borrowAction";
import { setAllreview } from "./reviewSlice";

//!get all reviews
export const getAllReviewAction = (isAdmin) => async (dispatch) => {
  const { status, message, payload } = await fetchAllReviewAPI(isAdmin);

  if (status === "success") {
    dispatch(setAllreview(payload));
  } else {
    toast.error(message);
  }
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
//!return borrowed book
export const updateReviewStatusAction =
  (isAdmin, payload) => async (dispatch) => {
    if (!isAdmin) {
      return;
    }
    const pending = updateReviewStatusAPI(payload);
    toast.promise(pending, {
      pending: "Please wait",
    });
    const { status, message } = await pending;
    toast[status](message);

    if (status === "success") {
      dispatch(getAllReviewAction(isAdmin));
    }
  };
