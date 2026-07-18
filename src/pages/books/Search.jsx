import BookListing from "@components/bookListing/BookListing";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();

  !query && navigate("/");

  const { publicBooks } = useSelector((state) => state.bookInfo);
  const searchBookArg = publicBooks.filter((b) => {
    const text = (b.title + "" + b.description).toLowerCase();
    return text.includes(query.toLowerCase());
  });
  return (
    <Container className="library-page py-4 py-lg-5">
      <Row>
        <Col>
          <Breadcrumb className="library-breadcrumb small mb-4">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/search" }}>
              Search
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="library-page-header library-page-header--compact mb-5">
            <span>Catalogue search</span>
            <h1>Results for “{query}”</h1>
            <p>Books matching your title, description, or keyword search.</p>
          </div>
        </Col>
      </Row>
      <BookListing bookList={searchBookArg} />
    </Container>
  );
};

export default Search;
