import axios from "axios";
import { toast } from "react-toastify";
import { fetchNewAcessJWTAPI } from "./authAPI";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};

const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};

export const apiProcessor = async ({
  url,
  method,
  payload,
  showToast,
  isPrivateCall,
  isRefreshJWT,
}) => {
  try {
    const headers = {};
    if (isPrivateCall) {
      const token = isRefreshJWT ? getRefreshJWT() : getAccessJWT();
      headers.authorization = "bearer " + token;
      if (!token) {
        return alert("No Token");
      }
    }
    const responsePending = axios({
      url,
      method,
      data: payload,
      headers,
    });

    if (showToast) {
      toast.promise(responsePending, {
        pending: "Please Wait...",
      });
    }
    const { data } = await responsePending;
    showToast && toast[data.status](data.message);
    return data;
  } catch (error) {
    console.log(error);
    const msg = error.response?.data?.message || error.message;
    showToast && toast.error(msg);
    console.log(msg);

    if (error.response?.status === 401 && msg === "jwt expired") {
      //call api to get new access jwt
      const { payload: accessJWT } = await fetchNewAcessJWTAPI();
      if (accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
        //call api processor
        return apiProcessor({
          url,
          method,
          payload,
          showToast,
          isPrivateCall,
          isRefreshJWT,
        });
      }
    } else {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }
    return {
      status: "error",
      message: msg,
    };
  }
};
