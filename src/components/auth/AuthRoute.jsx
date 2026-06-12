import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  //use real data
  const isAuth = false;
  return isAuth ? children : <Navigate to="/login" />;
};
