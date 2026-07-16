import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const borrowApiEP = apiBaseUrl + "/api/v1/borrows";

//!borrow API for admin
export const fetchAllBorrowsAPI = async (isAdmin) => {
  const path = isAdmin ? "/admin" : "/user";
  const obj = {
    url: borrowApiEP + path,
    method: "get",
    isPrivateCall: true,
  };
  const result = await apiProcessor(obj);
  return result;
};

//!borrow API for admin
export const patchReturnBorrowApi = async (payload) => {
  const obj = {
    url: borrowApiEP,
    method: "patch",
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};
