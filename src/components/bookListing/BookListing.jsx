import CustomCard, { CustomListCard } from "@components/customCard/CustomCard";
import CustomPagination from "@components/customPagination/CustomPagination";
import { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
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
        <div className="catalogue-toolbar d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 mb-4 border-bottom">
          <div className="d-flex flex-column">
            <span className="catalogue-toolbar__eyebrow">Catalogue</span>
            <strong>
              {bookList.length} {bookList.length === 1 ? "title" : "titles"}
            </strong>
          </div>
          <div className="catalogue-toolbar__views d-flex align-items-center gap-2">
            <span>View</span>
            <ButtonGroup aria-label="Catalogue view">
              <Button
                className={view === "card" ? "active" : ""}
                variant="light"
                onClick={() => setView("card")}
                aria-pressed={view === "card"}
              >
                <BsGrid3X3Gap /> <span className="visually-hidden">Grid</span>
              </Button>
              <Button
                className={view === "list" ? "active" : ""}
                variant="light"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
              >
                <BsListUl /> <span className="visually-hidden">List</span>
              </Button>
            </ButtonGroup>
          </div>
        </div>
        {displayBooks.length ? (
          <>
            <div className="row g-4">
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
            <CustomPagination
              active={active}
              setActive={setActive}
              pages={pages}
            />
          </>
        ) : (
          <div className="library-empty-state d-flex flex-column justify-content-center bg-white border rounded-3 text-center p-5">
            <span aria-hidden="true">⌕</span>
            <h2>No books found</h2>
            <p>Try another search term or check back when new titles arrive.</p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default BookListing;
