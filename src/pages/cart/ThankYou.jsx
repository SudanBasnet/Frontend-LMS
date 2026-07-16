import { emptyrecentBorrow } from "@features/cart/cartSlice";
import { useEffect, useRef } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
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
  console.log(recentBorrow);

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
    <Container>
      <Row>
        <Col>
          <Alert variant="success" className="mt-5">
            {" "}
            <h1 className="text-center ">Thank You</h1>
          </Alert>
          <div className="text-center">
            <Link to="/users/borrow-history">
              Please go to your account to view your borrowed book{" "}
            </Link>
          </div>

          <div>
            <Table striped hover className="mt-5">
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
                      <img src={getImageUrl(thumbnail)} width="60px" />
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
