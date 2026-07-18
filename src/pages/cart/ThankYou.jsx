import { emptyrecentBorrow } from "@features/cart/cartSlice";
import { useEffect, useRef } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const ThankYou = () => {
  const { recentBorrow } = useSelector((state) => state.cartInfo);

  const dispatch = useDispatch();
  const clearRecentBorrowTimer = useRef();

  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;
  useEffect(() => {
    clearTimeout(clearRecentBorrowTimer.current);

    return () => {
      clearRecentBorrowTimer.current = setTimeout(() => {
        dispatch(emptyrecentBorrow());
      }, 0);
    };
  }, [dispatch]);

  if (!recentBorrow?.length) {
    return <Navigate to="/users/borrow-history" replace />;
  }

  return (
    <Container className="library-page py-4 py-lg-5">
      <Row>
        <Col>
          <div className="borrow-success">
            <span aria-hidden="true">✓</span>
            <p>Borrowing confirmed</p>
            <h1>Enjoy your next chapter.</h1>
            <Link to="/users/my-borrow">View your borrowed books &rarr;</Link>
          </div>

          <div className="workspace-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4 mt-4">
            <Table responsive hover className="library-table align-middle">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Book Title</th>
                  <th>Transaction ID</th>
                  <th>Available Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBorrow?.map(({ _id, thumbnail, bookTitle, dueDate }) => (
                  <tr key={_id}>
                    <td>
                      <img src={getImageUrl(thumbnail)} alt={bookTitle} className="table-book-cover" />
                    </td>
                    <td>{bookTitle}</td>
                    <td>{_id}</td>
                    <td>
                      {" "}
                      {!dueDate
                        ? "Not Available"
                        : "Available On " + dueDate.slice(0, 10)}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
