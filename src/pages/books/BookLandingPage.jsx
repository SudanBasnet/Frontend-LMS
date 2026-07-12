import { fetchSinglePublicBookAction } from "@features/book/bookAction";
import { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const BookLandingPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { publicBooks } = useSelector((state) => state.bookInfo);
  const [book, setBook] = useState({});

  useEffect(() => {
    //!first approach locally
    // const selectedBook = publicBooks?.find((book) => book.slug === slug);
    // setBook(selectedBook);
    // console.log(book.imgUrl);
    //! second approach fetch from server
    dispatch(fetchSinglePublicBookAction(slug));
  }, [publicBooks, dispatch, slug]);

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
            <Breadcrumb.Item active>{book?.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <img
              src={import.meta.env.VITE_BASE_URL + book?.imgUrl?.slice(6)}
              alt=""
            />
          </div>
          Img section
        </Col>
        <Col>Book Info section</Col>
      </Row>
      <Row>
        <Col>Bottom SEction</Col>
      </Row>
    </Container>
  );
};

export default BookLandingPage;
