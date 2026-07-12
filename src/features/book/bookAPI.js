import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const bookApiEP = apiBaseUrl + "/api/v1/books";

//!add book API
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

//!Private API for admins
export const adminFetchAllBookAPI = async () => {
  const obj = {
    url: bookApiEP,
    method: "get",
    isPrivateCall: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
//!public API for public
export const fetchAllPublicBookAPI = async () => {
  const obj = {
    url: bookApiEP,
    method: "get",
  };
  const result = await apiProcessor(obj);
  return result;
};
//!public API for public single book
export const fetchsinglePublicBookAPI = async (slug) => {
  const obj = {
    url: bookApiEP + "/public/" + slug,
    method: "get",
  };
  const result = await apiProcessor(obj);
  return result;
};

//!update book API
export const updateBookAPI = async (payload) => {
  const obj = {
    url: bookApiEP,
    method: "put",
    isPrivateCall: true,
    showToast: true,
    payload,
  };
  const result = await apiProcessor(obj);
  return result;
};

//!delete book API
export const deleteBookAPI = async (_id) => {
  const obj = {
    url: bookApiEP + "/" + _id,
    method: "delete",
    isPrivateCall: true,
    showToast: true,
  };
  const result = await apiProcessor(obj);
  return result;
};
