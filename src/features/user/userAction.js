import { fetchNewAcessJWTAPI } from "../../services/authAPI";
import { fetchUserAPI } from "./userAPI";
import { setUser } from "./userSlice";

export const fetchUserAction = () => async (dispatch) => {
  //call api
  const { status, payload } = await fetchUserAPI();

  //receive user
  //dispatch user to redux store
  status === "success" && payload?._id && dispatch(setUser(payload));
};

export const autoLoginUser = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  if (accessJWT) {
    const result = dispatch(fetchUserAction());
    return result;
  }
  const refreshJWT = localStorage.getItem("refreshJWT");
  if (refreshJWT) {
    //fetch accessJWT and set in the session storage

    const { payload } = await fetchNewAcessJWTAPI();

    if (payload) {
      sessionStorage.setItem("accessJWT", payload);
      dispatch(fetchUserAction());
    } //dispatch(fetchUserAction())
  }
};
