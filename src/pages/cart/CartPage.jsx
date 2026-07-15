import { setRemoveBookFromCart } from "@features/book/bookSlice";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const { cart } = useSelector((state) => state.bookInfo);
  const dispatch = useDispatch((state) => state.bookInfo);
  console.log(cart);
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  const handleOnBookRemove = (_id) => {
    dispatch(setRemoveBookFromCart(_id));
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
                    @
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
              {" "}
              <Button variant="dark">
                Login to Borrow || Proceed to Borrow
              </Button>
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
