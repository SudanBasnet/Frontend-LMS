import BookListing from "@components/bookListing/BookListing";
import { fetchAllPublicBookAction } from "@features/book/bookAction";
import { useEffect } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { publicBooks } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    dispatch(fetchAllPublicBookAction());
  }, [dispatch]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/all-books" }}>
              All Books
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <BookListing bookList={publicBooks} />
    </Container>
  );
};

export default AllBooks;
