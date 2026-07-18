import { Alert, Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  emptyCart,
  setrecentBorrow,
  setRemoveBookFromCart,
} from "../../features/cart/cartSlice";
import { postBorrowAPI } from "@features/cart/cartAPI";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cartInfo);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  const handleOnBookRemove = (_id) => {
    dispatch(setRemoveBookFromCart(_id));
  };
  const handleOnBorrowing = async () => {
    if (confirm("Are you sure you want to borrow these books?")) {
      const booksArg = cart.map(({ _id, title, imgUrl, slug }) => {
        return {
          bookId: _id,
          bookTitle: title,
          thumbnail: imgUrl,
          bookSlug: slug,
        };
      });

      const pending = postBorrowAPI(booksArg);
      toast.promise(pending, { pending: "Please wait..." });
      const { message, status, payload } = await pending;

      toast[status](message);

      dispatch(setrecentBorrow(payload));

      dispatch(emptyCart());
      navigate("/users/thank-you");
    }
  };
  return (
    <Container className="library-page cart-page py-4 py-lg-5">
      <Row>
        <Col>
          <div className="library-page-header library-page-header--compact mb-5">
            <span>Ready to borrow</span>
            <h1>Your borrowing bag</h1>
            <p>Review your selected books before completing the loan.</p>
          </div>

          {cart.length > 0 ? (
            <div className="workspace-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4">
              <Table responsive hover className="library-table align-middle cart-table">
                <thead><tr><th>Book</th><th>Title</th><th>Availability</th><th>Action</th></tr></thead>
                <tbody>
                  {cart.map((book) => (
                    <tr key={book._id}>
                      <td><img src={getImageUrl(book.imgUrl)} alt={book.title} className="table-book-cover" /></td>
                      <td><strong>{book.title}</strong></td>
                      <td>
                        <Badge bg={book.expectedAvailable ? "warning" : "success"} text={book.expectedAvailable ? "dark" : undefined}>
                          {book.expectedAvailable ? `Expected ${book.expectedAvailable.slice(0, 10)}` : "Available"}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline-danger" size="sm" onClick={() => handleOnBookRemove(book._id)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="cart-checkout d-flex flex-wrap justify-content-end align-items-center gap-4 border-top pt-4 mt-4">
                <div className="d-flex align-items-center gap-2"><span>Selected books</span><strong className="fs-2 text-success">{cart.length}</strong></div>
                {user._id ? (
                  <Button variant="success" onClick={handleOnBorrowing}>Complete borrowing</Button>
                ) : (
                  <Link to="/login" state={{ from: "/cart" }}><Button variant="success">Sign in to borrow</Button></Link>
                )}
              </div>
            </div>
          ) : (
            <Alert className="library-empty-state d-flex flex-column justify-content-center text-center" variant="light">
              <span aria-hidden="true">◇</span>
              <h2>Your borrowing bag is empty</h2>
              <p>Browse the catalogue and add a book when you find your next read.</p>
              <Link to="/all-books" className="btn btn-success mt-3">Explore catalogue</Link>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
