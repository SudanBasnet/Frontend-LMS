//!all API related to signup,login, token

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

//!Activate new user
export const activateNewUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/activate-user",
    method: "post",
    payload,
  };
  return apiProcessor(obj);
};

//!signin  new user
export const signInUserAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/login",
    method: "post",
    payload,
    showToast: true,
  };
  return apiProcessor(obj);
};

//!request new accessJWT
export const fetchNewAcessJWTAPI = async () => {
  const obj = {
    url: authApiEP + "/renew-jwt",
    method: "get",
    isPrivateCall: true,
    isRefreshJWT: true,
  };
  return apiProcessor(obj);
};

//!logout user
export const logoutAPI = async () => {
  const obj = {
    url: authApiEP + "/logout",
    method: "get",
    isPrivateCall: true,
  };
  return apiProcessor(obj);
};

//!request password reset otp
export const requestPassResetOTPAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/otp",
    method: "post",
    payload,
  };
  return apiProcessor(obj);
};

//!request password reset otp
export const resetPasswordAPI = async (payload) => {
  const obj = {
    url: authApiEP + "/reset-password",
    method: "post",
    payload,
    showToast: true,
  };
  return apiProcessor(obj);
};
