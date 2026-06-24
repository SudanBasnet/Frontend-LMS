import { fetchUserAPI } from "./userAPI";
import { setUser } from "./userSlice";

export const fetchUserAction = () => async (dispatch) => {
  //call api
  const { status, payload } = await fetchUserAPI();

  //receive user
  //dispatch user to redux store
  status === "success" && payload?._id && dispatch(setUser(payload));
};
