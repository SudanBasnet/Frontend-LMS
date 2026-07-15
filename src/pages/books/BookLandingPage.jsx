import Reviews from "@components/reviews/Reviews";
import Star from "@components/star/Star";
import { fetchSinglePublicBookAction } from "@features/book/bookAction";
import { setCart } from "@features/cart/cartSlice";

import { useEffect, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BookLandingPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selectedBook } = useSelector((state) => state.bookInfo);
  const { cart } = useSelector((state) => state.cartInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [showUrl, setshowUrl] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchSinglePublicBookAction(slug));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [dispatch, slug]);

  const handleOnAddToCart = () => {
    toast("Book is added in the cart");
    dispatch(setCart(selectedBook));
  };
  const isBookInTheCart = cart.find((item) => item._id === selectedBook._id);
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
            <Breadcrumb.Item active>{selectedBook?.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {isLoading && (
        <Row>
          <Col className="text-center py-5">
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading book...</span>
            </Spinner>
          </Col>
        </Row>
      )}

      {!isLoading && !selectedBook?._id && (
        <Row>
          <Col>
            <Alert variant="danger">
              The book is not available , Please contact Admin
            </Alert>
          </Col>
        </Row>
      )}

      {!isLoading && selectedBook?._id && (
        <>
          <Row>
            <Col md={4}>
              <div className="mb-4" style={{ height: "400px" }}>
                <img
                  src={
                    import.meta.env.VITE_BASE_URL +
                    selectedBook?.imageList[showUrl].slice(6)
                  }
                  alt={selectedBook.title}
                  // width={"100%"}
                  className="h-100 w-100 object-fit"
                />
              </div>
              {/* Scrollable thumbnail */}

              <div className="d-flex overflow-auto gap-2">
                {selectedBook.imageList?.map((url, i) => (
                  <img
                    src={import.meta.env.VITE_BASE_URL + url.slice(6)}
                    key={url}
                    width={"80px"}
                    className="img-thumbnail"
                    onClick={() => setshowUrl(i)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="top">
                  <h1>{selectedBook.title}</h1>
                  <div className="fw-bolder">
                    {selectedBook.author} - {selectedBook.year}
                  </div>
                  <div className="my-3 d-flex gap-2">
                    <span>{selectedBook.genre}</span> |{" "}
                    <span>
                      <Star avgRating={2.5} totalReviews={334} />
                    </span>
                  </div>
                  <div>{selectedBook.description.slice(0, 300)}...........</div>
                </div>

                <div className="bottom">
                  <hr />
                  <div className="d-grid mb-3">
                    <Button
                      variant="dark"
                      onClick={handleOnAddToCart}
                      disabled={isBookInTheCart}
                    >
                      {isBookInTheCart
                        ? "Book is Already in the cart"
                        : "Add to Borrowing List"}{" "}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-5 mb-5">
            <Col className="border p-3 rounded">
              <h3 className="margin-auto mt-5 text-center">More Details</h3>
              <Tabs defaultActiveKey="description" className="mb-3">
                <Tab eventKey="description" title="description">
                  <div>{selectedBook.description}</div>
                </Tab>
                <Tab eventKey="reviews" title="reviews">
                  <Reviews />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookLandingPage;
