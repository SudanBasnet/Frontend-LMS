import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setRemoveBookFromCart } from "../../features/cart/cartSlice";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cartInfo);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch((state) => state.bookInfo);
  const navigate = useNavigate();
  console.log(cart);
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  const handleOnBookRemove = (_id) => {
    dispatch(setRemoveBookFromCart(_id));
  };
  const handleOnBorrowing = () => {
    if (window.confirm("Are you sure you want to borrow these books?")) {
      navigate("/users/borrow-history");
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <Table striped hover className="mt-5">
            <tbody>
              {cart.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img src={getImageUrl(book.imgUrl)} width="60px" />
                  </td>
                  <td>{book.title}</td>
                  <td>
                    {" "}
                    {!book.expectedAvailable
                      ? "Not Available"
                      : book.expectedAvailable}{" "}
                  </td>
                  <td>
                    <Button
                      variant="link"
                      className=""
                      onClick={() => handleOnBookRemove(book._id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {cart.length > 0 ? (
            <div className="text-end">
              {user._id ? (
                <Button variant="dark" onClick={handleOnBorrowing}>
                  Proceed to Borrow
                </Button>
              ) : (
                <Link to="/login" state={{ from: "/cart" }}>
                  <Button variant="dark">Login to Borrow</Button>
                </Link>
              )}
            </div>
          ) : (
            <Alert variant="info">No book added to Cart</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
