import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/LMSlogo.png";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LuGauge } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { logoutAPI } from "../../services/authAPI";
import { setUser } from "../../features/user/userSlice";
import { useState } from "react";

const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleOnLogout = async (e) => {
    e.preventDefault();
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    //call api to logout from backend
    await Promise.allSettled([
      logoutAPI(),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
    //logout from frontend
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setUser({}));
    navigate("/");
  };
  return (
    <Navbar expand="md" className="bg-dark" variant="dark">
      <Container>
        <Link to="/">
          <img src={logo} width="150px" alt="" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">
              <IoHomeOutline /> Home
            </Link>
            {user?._id ? (
              <>
                <Link className="nav-link" to="/users">
                  <LuGauge /> Dashboard
                </Link>
                <Link
                  className="nav-link"
                  to="/"
                  onClick={handleOnLogout}
                  aria-disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FiLogOut />
                  )}
                  {isLoggingOut ? " Logging out..." : " Logout"}
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/signup">
                  <IoCreate /> Sign Up
                </Link>
                <Link className="nav-link" to="/login">
                  <IoIosLogIn /> LogIn
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
