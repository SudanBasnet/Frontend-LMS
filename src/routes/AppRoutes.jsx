import { Route, Routes } from "react-router-dom";
import { HomePage, DashboardPage } from "../pages/index";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public pages */}

      <Route path="/" element={<HomePage />} />

      {/* Private Pages */}
      <Route path="/users" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
