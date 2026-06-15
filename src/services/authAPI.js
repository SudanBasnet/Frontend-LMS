//all API related to signup,login, token

import { apiProcessor } from "./api.js";
const apiBaseUrl = "http://localhost:8080";
const authApiEP = apiBaseUrl + "/api/v1/auth";

export const signUpNewUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/register",
    method: "post",
    payload,
  };
  const result = await apiProcessor(obj);
  console.log(result);
};
