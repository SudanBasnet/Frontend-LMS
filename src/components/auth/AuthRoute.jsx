import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  const { user } = useSelector((state) => state.userInfo);
  const isAuth = user?._id;
  return isAuth ? (
    children
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
};
