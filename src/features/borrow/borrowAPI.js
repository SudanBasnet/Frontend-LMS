import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const borrowApiEP = apiBaseUrl + "/api/v1/borrows";

//!borrow API for admin
export const fetchAllBorrowsAPI = async () => {
  const obj = {
    url: borrowApiEP + "/admin",
    method: "get",
    isPrivateCall: true,
  };
  const result = await apiProcessor(obj);
  return result;
};

//!borrow API for public
export const fetchAllBorrowsAPIforuser = async () => {
  const obj = {
    url: borrowApiEP + "/user",
    method: "get",
    isPrivateCall: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
