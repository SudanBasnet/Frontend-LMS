import Stack from "react-bootstrap/Stack";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  LuBookMarked,
  LuBookOpen,
  LuHistory,
  LuLayoutDashboard,
  LuMessageSquareText,
  LuUserRound,
  LuUsers,
} from "react-icons/lu";

const SideBar = () => {
  const { user } = useSelector((state) => state.userInfo);
  const isAdmin = user.role === "admin";
  return (
    <Stack gap={1} className="library-sidebar__nav">
      <NavLink className="library-sidebar__link" to="/users" end>
        <LuLayoutDashboard /> Dashboard
      </NavLink>

      <NavLink className="library-sidebar__link" to="/users/my-borrow">
        <LuBookMarked /> My borrowed books
      </NavLink>

      <NavLink className="library-sidebar__link" to="/users/profile">
        <LuUserRound /> My profile
      </NavLink>
      {isAdmin && (
        <>
          <div className="library-sidebar__label">Administration</div>
          <NavLink className="library-sidebar__link" to="/users/books">
            <LuBookOpen /> Manage books
          </NavLink>
          <NavLink className="library-sidebar__link" to="/users/reviews">
            <LuMessageSquareText /> Review moderation
          </NavLink>
          <NavLink className="library-sidebar__link" to="/users/user-list">
            <LuUsers /> Library members
          </NavLink>
          <NavLink
            className="library-sidebar__link"
            to="/users/borrow-history"
          >
            <LuHistory /> Borrow history
          </NavLink>
        </>
      )}
    </Stack>
  );
};

export default SideBar;
