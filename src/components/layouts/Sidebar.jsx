import Stack from "react-bootstrap/Stack";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { user } = useSelector((state) => state.userInfo);
  const isAdmin = user.role === "admin";
  return (
    <Stack gap={3}>
      <div className="p-2">
        <Link className="nav-link" to="/users">
          Dashboard
        </Link>
      </div>

      <div className="p-2">
        <Link className="nav-link" to="/users/my-borrow">
          My Borrow List
        </Link>
      </div>

      <div className="p-2">
        <Link className="nav-link" to="/users/Profile">
          Profile
        </Link>
      </div>
      {isAdmin && (
        <>
          <div className="p-2">
            <Link className="nav-link" to="/users/books">
              Book
            </Link>
          </div>
          <div className="p-2">
            <Link className="nav-link" to="/users/reviews">
              reviews
            </Link>
          </div>
          <div className="p-2">
            <Link className="nav-link" to="/users/user-list">
              All Users
            </Link>
          </div>
          <div className="p-2">
            <Link className="nav-link" to="/users/borrow-history">
              All Borrow History
            </Link>
          </div>
        </>
      )}
    </Stack>
  );
};

export default SideBar;
