import CustomCard, { CustomListCard } from "@components/customCard/CustomCard";
import { fetchAllPublicBookAction } from "@features/book/bookAction";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const dispatch = useDispatch();
  const { publicBooks } = useSelector((state) => state.bookInfo);
  const [view, setView] = useState("card");

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
      <Row>
        <Col>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div>{publicBooks.length} Books Found!</div>
            <div>
              {" "}
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant={view === "card" ? "dark" : "secondary"}
                  onClick={() => setView("card")}
                >
                  Card
                </Button>
                <Button
                  variant={view === "list" ? "dark" : "secondary"}
                  onClick={() => setView("list")}
                >
                  List
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="row g-3">
            {publicBooks.map((book) => (
              <div
                className={
                  view === "card"
                    ? "col-12 col-sm-6 col-lg-3 d-flex"
                    : "col-12 d-flex"
                }
                key={book._id}
              >
                {view === "card" ? (
                  <CustomCard {...book} />
                ) : (
                  <CustomListCard {...book} />
                )}
              </div>
            ))}
          </div>
          <div>Pagination To do</div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllBooks;
