//all API related to signup,login, token

import { apiProcessor } from "./api.js";
const apiBaseUrl = "http://localhost:8080";
const authApiEP = apiBaseUrl + "/api/v1/auth";

export const signUpNewUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/register",
    method: "post",
    payload,
    showToast: true,
  };
  const result = await apiProcessor(obj);
  return result;
};

//Activate new user
export const activateNewUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/activate-user",
    method: "post",
    payload,
  };
  return apiProcessor(obj);
};
