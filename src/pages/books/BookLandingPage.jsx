import Reviews from "@components/reviews/Reviews";
import Star from "@components/star/Star";
import { fetchSinglePublicBookAction } from "@features/book/bookAction";
import { setCart } from "@features/cart/cartSlice";
import { getAllReviewAction } from "@features/review/ReviewAction";

import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
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
  const { reviews } = useSelector((state) => state.reviewInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [showUrl, setshowUrl] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          dispatch(fetchSinglePublicBookAction(slug)),
          dispatch(getAllReviewAction(false)),
        ]);
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
  const bookReviews = reviews.filter(
    (r) => r.bookId?._id === selectedBook?._id,
  );
  const averageRating = bookReviews.length
    ? bookReviews.reduce((total, review) => total + review.rating, 0) /
      bookReviews.length
    : 0;

  const imageList = selectedBook?.imageList?.length
    ? selectedBook.imageList
    : selectedBook?.imgUrl
      ? [selectedBook.imgUrl]
      : [];
  const getImageUrl = (url = "") => {
    if (/^https?:\/\//.test(url)) return url;
    const imagePath = url.replace(/^\/?public/, "");
    return `${import.meta.env.VITE_BASE_URL}${imagePath}`;
  };
  const selectedImage = imageList[showUrl] || imageList[0];

  return (
    <Container className="library-page book-detail-page py-4 py-lg-5">
      <Row>
        <Col>
          <Breadcrumb className="library-breadcrumb small mb-4">
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
          <Row className="book-detail-card g-0 border rounded-3 shadow bg-white overflow-hidden">
            <Col lg={5}>
              <div className="book-detail-gallery h-100 p-4 p-xl-5">
                <div className="book-detail-gallery__main">
                  {selectedImage ? (
                    <img
                      src={getImageUrl(selectedImage)}
                      alt={selectedBook.title}
                    />
                  ) : (
                    <div className="book-detail-gallery__empty">No cover</div>
                  )}
                </div>
                {imageList.length > 1 && (
                  <div className="book-detail-thumbnails d-flex justify-content-center gap-2 mt-4 overflow-auto">
                    {imageList.map((url, i) => (
                      <button
                        type="button"
                        className={i === showUrl ? "active" : ""}
                        key={url}
                        onClick={() => setshowUrl(i)}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img src={getImageUrl(url)} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Col>
            <Col>
              <div className="book-detail-copy d-flex flex-column justify-content-between h-100 p-4 p-xl-5">
                <div>
                  <div className="book-detail-copy__meta d-flex justify-content-between align-items-center gap-3">
                    <span>{selectedBook.genre || "General collection"}</span>
                    <Badge bg={selectedBook.expectedAvailable ? "warning" : "success"} text={selectedBook.expectedAvailable ? "dark" : undefined}>
                      {selectedBook.expectedAvailable ? "On loan" : "Available"}
                    </Badge>
                  </div>
                  <h1>{selectedBook.title}</h1>
                  <p className="book-detail-copy__author">
                    By <strong>{selectedBook.author}</strong> &middot; Published {selectedBook.year}
                  </p>
                  <div className="book-detail-copy__rating">
                    <Star
                      avgRating={averageRating}
                      totalReviews={bookReviews.length}
                    />
                  </div>
                  <p className="book-detail-copy__description">
                    {selectedBook.description?.slice(0, 360)}
                    {selectedBook.description?.length > 360 ? "…" : ""}
                  </p>
                </div>

                <div className="book-detail-borrow border-top pt-4 mt-4">
                  {selectedBook.expectedAvailable && (
                    <p>
                      Expected back on <strong>{selectedBook.expectedAvailable.slice(0, 10)}</strong>
                    </p>
                  )}
                  <div className="d-grid">
                    <Button
                      variant="success"
                      className="py-3"
                      onClick={handleOnAddToCart}
                      disabled={
                        selectedBook.expectedAvailable || isBookInTheCart
                      }
                    >
                      {selectedBook.expectedAvailable
                        ? "Currently unavailable"
                        : isBookInTheCart
                          ? "Already in borrowing bag"
                          : "Add to borrowing bag"}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="book-detail-tabs bg-white border rounded-3 p-3 p-lg-4">
              <Tabs defaultActiveKey="description">
                <Tab eventKey="description" title="About this book">
                  <div>{selectedBook.description}</div>
                </Tab>
                <Tab eventKey="reviews" title={`Reader reviews (${bookReviews.length})`}>
                  <Reviews reviews={bookReviews} />
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
