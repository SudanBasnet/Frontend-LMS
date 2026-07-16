import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Stack gap={3}>
      <div className="p-2">
        <Link className="nav-link" to="/users">
          Dashboard
        </Link>
      </div>
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
    </Stack>
  );
};

export default SideBar;
