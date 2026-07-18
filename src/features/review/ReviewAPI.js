import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const reviewApiEP = apiBaseUrl + "/api/v1/reviews";

// //!borrow API for admin
export const fetchAllReviewAPI = async (isAdmin) => {
  const path = isAdmin ? "/admin" : "";
  const obj = {
    url: reviewApiEP + path,
    method: "get",
    isPrivateCall: isAdmin,
  };
  const result = await apiProcessor(obj);
  return result;
};

//!review API
export const postnewReviewApi = async (payload) => {
  const obj = {
    url: reviewApiEP,
    method: "post",
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};
//!update review API
export const updateReviewStatusAPI = async (payload) => {
  const obj = {
    url: reviewApiEP + "/admin",
    method: "patch",
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};
