import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="library-footer text-white py-5">
      <Container>
        <Row className="g-4 align-items-start pb-4">
          <Col lg={8}>
          <p className="library-footer__eyebrow">Library Management System</p>
          <h2>Helping every book find its next reader.</h2>
          </Col>
          <Col lg={4} className="d-flex flex-column gap-2" aria-label="Footer navigation">
            <Link to="/all-books">Browse collection</Link>
            <Link to="/login">Member access</Link>
            <Link to="/signup">Join the library</Link>
          </Col>
        </Row>
      <div className="library-footer__bottom d-flex flex-column flex-sm-row justify-content-between gap-2 pt-4">
        <span>&copy; {new Date().getFullYear()} LMS. All rights reserved.</span>
        <span>Made by Sudan Basnet</span>
      </div>
      </Container>
    </footer>
  );
};

export default Footer;
