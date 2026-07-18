import CustomCarousel from "@components/customCarousel/CustomCarousel";
import BestRead from "@components/pageSection/BestRead";
import JustInSection from "@components/pageSection/JustInSection";
import Recommendation from "@components/pageSection/Recommendation";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { publicBooks } = useSelector((state) => state.bookInfo);
  const availableBooks = publicBooks.filter(
    (book) => book.available !== false && !book.expectedAvailable,
  ).length;

  return (
    <div className="library-home">
      <CustomCarousel />
      <Container className="library-home__content">
        <Row
          className="library-stats g-0 overflow-hidden rounded-3 shadow"
          aria-label="Library overview"
        >
          <Col md className="library-stat d-flex align-items-center gap-3 p-4">
            <strong>{publicBooks.length}</strong>
            <span>Titles in the catalogue</span>
          </Col>
          <Col md className="library-stat d-flex align-items-center gap-3 p-4">
            <strong>{availableBooks}</strong>
            <span>Available to borrow now</span>
          </Col>
          <Col md className="library-stat d-flex align-items-center gap-3 p-4">
            <strong>14 days</strong>
            <span>Standard borrowing period</span>
          </Col>
        </Row>
        <JustInSection />
        <BestRead />
        <Recommendation />
      </Container>
    </div>
  );
};

export default HomePage;
