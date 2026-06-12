import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  DashboardPage,
  SignUpPage,
  SignInPage,
  BookLandingPage,
  ForgetPasswordPage,
} from "../pages/index";
import DefaultLayout from "../components/layouts/DefaultLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public pages */}

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
      </Route>

      {/* Private Pages */}
      <Route path="/users" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
