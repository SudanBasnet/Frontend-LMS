import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const borrowApiEP = apiBaseUrl + "/api/v1/reviews";

// //!borrow API for admin
export const fetchAllReviewAPI = async (isAdmin) => {
  const path = isAdmin ? "/admin" : "";
  const obj = {
    url: borrowApiEP + path,
    method: "get",
    isPrivateCall: isAdmin,
  };
  const result = await apiProcessor(obj);
  return result;
};

//!review API
export const postnewReviewApi = async (payload) => {
  const obj = {
    url: borrowApiEP,
    method: "post",
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};
