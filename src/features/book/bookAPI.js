import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const bookApiEP = apiBaseUrl + "/api/v1/books";

export const postNewBookAPI = async (payload) => {
  const obj = {
    url: bookApiEP,
    method: "post",
    isPrivateCall: true,
    showToast: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};
