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
    <Container className="library-page py-4 py-lg-5">
      <Row>
        <Col>
          <Breadcrumb className="library-breadcrumb small mb-4">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/all-books" }}>
              All Books
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="library-page-header mb-5">
            <span>Browse the shelves</span>
            <h1>Library catalogue</h1>
            <p>
              Explore the complete collection and check live borrowing
              availability before choosing your next book.
            </p>
          </div>
        </Col>
      </Row>
      <BookListing bookList={publicBooks} />
    </Container>
  );
};

export default AllBooks;
