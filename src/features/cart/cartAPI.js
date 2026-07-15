import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const borrowApiEP = apiBaseUrl + "/api/v1/borrows";

export const postBorrowAPI = async (payload) => {
  const obj = {
    url: borrowApiEP,
    method: "post",
    showToast: false,
    isPrivateCall: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};
