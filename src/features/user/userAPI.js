import { apiProcessor } from "../../services/api.js";

// const apiBaseUrl = "http://localhost:8080";
const apiBaseUrl = import.meta.env.VITE_BASE_URL;
const userApiEP = apiBaseUrl + "/api/v1/user";

export const fetchUserAPI = async () => {
  const obj = {
    url: userApiEP + "/profile",
    method: "get",
    isPrivateCall: true,
    showToast: false,
  };
  const result = await apiProcessor(obj);
  return result;
};
