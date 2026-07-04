import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import SideBar from "./Sidebar";
import { AuthRoute } from "../auth/AuthRoute";

const UserLayout = () => {
  return (
    <AuthRoute>
      <div>
        {/* navbar */}
        <Header />

        <div className="d-flex">
          <div className="bg-dark text-white">
            <div className="p-3">
              <div>Welcome Back</div>
              <h4>Sudan Basnet</h4>
            </div>
            <hr />
            <SideBar />
          </div>

          {/* main body */}
          <main className="main">
            <Outlet />
          </main>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </AuthRoute>
  );
};

export default UserLayout;
