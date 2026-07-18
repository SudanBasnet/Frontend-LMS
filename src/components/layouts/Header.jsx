import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/LMSlogo.png";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LuBookOpen, LuGauge } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { logoutAPI } from "../../services/authAPI";
import { setUser } from "../../features/user/userSlice";
import { useRef, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { setAllBorrow, setMyBorrow } from "@features/borrow/borrowSlice";

const Header = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { cart } = useSelector((state) => state.cartInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const searchRef = useRef("");

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
    window.google?.accounts?.id?.disableAutoSelect();
    setIsLoggingOut(false);
    dispatch(setUser({}));
    dispatch(setMyBorrow([]));
    dispatch(setAllBorrow([]));
    navigate("/");
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    const str = searchRef.current.value;
    str && navigate("/search?query=" + str);
  };

  return (
    <Navbar expand="lg" className="library-navbar sticky-top" variant="dark">
      <Container fluid="xl">
        <Link to="/" className="library-brand" aria-label="LMS home">
          <img src={logo} alt="Library Management System" />
        </Link>
        <Navbar.Toggle aria-controls="library-navbar-nav" />
        <Navbar.Collapse id="library-navbar-nav">
          <div className="library-navbar__content">
            <Form className="library-search" onSubmit={handleOnSearch}>
              <InputGroup>
                <InputGroup.Text className="library-search__icon">
                  <FaSearch aria-hidden="true" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by title, author or keyword"
                  aria-label="Search the library catalogue"
                  name="s"
                  ref={searchRef}
                />
                <InputGroup.Text
                  as="button"
                  type="submit"
                  className="library-search__submit"
                  aria-label="Submit search"
                >
                  Search
                </InputGroup.Text>
              </InputGroup>
            </Form>
            <Nav className="library-nav">
              <NavLink className="nav-link" to="/" end>
                <IoHomeOutline /> Home
              </NavLink>
              <NavLink className="nav-link" to="/all-books">
                <LuBookOpen /> Catalogue
              </NavLink>
              {user?._id ? (
                <>
                  <NavLink className="nav-link" to="/users">
                    <LuGauge /> Dashboard
                  </NavLink>

                  <Link
                    className="nav-link library-logout"
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
                    <IoCreate /> Join
                  </Link>
                  <Link className="nav-link" to="/login">
                    <IoIosLogIn /> Sign in
                  </Link>
                </>
              )}
              <NavLink
                to="/cart"
                className="nav-link library-cart position-relative"
                aria-label={`Borrowing bag with ${cart.length} books`}
              >
                <BsCart3 />
                <span className="cart-count">{cart.length}</span>
              </NavLink>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
