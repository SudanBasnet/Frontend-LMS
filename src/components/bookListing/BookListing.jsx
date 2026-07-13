import CustomCard, { CustomListCard } from "@components/customCard/CustomCard";
import CustomPagination from "@components/customPagination/CustomPagination";
import { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
const booksPerScreen = 8;
const BookListing = ({ bookList }) => {
  const [view, setView] = useState("card");
  const [active, setActive] = useState(1);
  //! Pagination calculation
  const pages = Math.ceil(bookList.length / booksPerScreen);
  const startIndex = (active - 1) * booksPerScreen;
  const endIndex = startIndex + booksPerScreen;

  const displayBooks = bookList.slice(startIndex, endIndex);

  return (
    <Row>
      <Col>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div>{displayBooks.length} Books Found!</div>
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
          {displayBooks.map((book) => (
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
        <CustomPagination active={active} setActive={setActive} pages={pages} />
      </Col>
    </Row>
  );
};

export default BookListing;
