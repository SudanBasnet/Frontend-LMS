import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

import SideBar from "./Sidebar";
import { AuthRoute } from "../auth/AuthRoute";
import { useSelector } from "react-redux";
import { ModalWrapper } from "../modalWrapper/ModalWrapper";

const UserLayout = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <AuthRoute>
      <div className="site-shell user-site-shell">
        <Header />

        <div className="library-workspace d-flex flex-column flex-md-row">
          <aside className="library-sidebar p-3 text-white">
            <div className="library-sidebar__profile">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="library-sidebar__avatar object-fit-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="library-sidebar__avatar">
                  {user.fName?.charAt(0) || "M"}
                </span>
              )}
              <div>
                <small>Welcome back</small>
                <strong>{user.fName || "Library member"}</strong>
                <span>{user.role === "admin" ? "Administrator" : "Member"}</span>
              </div>
            </div>
            <SideBar />
          </aside>

          <main className="user-main flex-grow-1">
            <Outlet />
          </main>
        </div>
      </div>

      <ModalWrapper />
      <Footer />
    </AuthRoute>
  );
};

export default UserLayout;
