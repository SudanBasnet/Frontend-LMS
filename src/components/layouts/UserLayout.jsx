import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import SideBar from "./Sidebar";
import { AuthRoute } from "../auth/AuthRoute";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <AuthRoute>
      <div>
        {/* navbar */}
        <Header />

        <div className="d-flex">
          <div className="bg-dark text-white">
            <div className="p-3">
              <div>Welcome Back</div>
              <h4>
                {user.fName}({user.role})
              </h4>
            </div>
            <hr />
            <SideBar />
          </div>

          {/* main body */}
          <main className="user-main">
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
