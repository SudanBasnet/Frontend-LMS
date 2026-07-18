import { NewReviewForm } from "@components/forms";
import {
  getAllBorrowsAction,
  returnBorrowsAction,
} from "@features/borrow/borrowAction";
import { setModalContent, setModalShow } from "@features/system/systemSlice";

import { useEffect, useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

const BorrowTable = ({ isAdmin }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { allBorrows, myBorrows } = useSelector((state) => state.borrowInfo);
  const borrowsSource = isAdmin ? allBorrows : myBorrows;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime] = useState(() => Date.now());
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  useEffect(() => {
    dispatch(getAllBorrowsAction(isAdmin));
  }, [dispatch, isAdmin]);

  const query = searchTerm.trim().toLowerCase();
  const borrowList = Array.isArray(borrowsSource) ? borrowsSource : [];
  const filteredBorrows = borrowList.filter(({ bookTitle = "" }) =>
    bookTitle.toLowerCase().includes(query),
  );

  const handleOnBookReturn = (_id) => {
    if (confirm("Are you sure you want to return this book")) {
      dispatch(returnBorrowsAction({ _id }));
    }
  };
  const handleOnLeaveReview = (obj) => {
    console.log(obj);
    dispatch(
      setModalContent({
        content: <NewReviewForm borrowData={obj} />,
        title: <h3>Leave your review</h3>,
      }),
    );
    dispatch(setModalShow(true));
  };
  return (
    <div>
      <div className="table-toolbar d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div className="table-result-count fw-bold">
          {filteredBorrows.length}{" "}
          {filteredBorrows.length === 1 ? "Book Found" : "Books Found"}
        </div>
        <div className="">
          <Form.Control
            placeholder="Search book by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table responsive hover className="library-table align-middle">
        <thead>
          <tr>
            <th>#</th>
            {!pathname.includes("my-borrow") && <th>Status</th>}
            <th>BookTitle</th>
            <th>Thumbnail</th>
            <th>Due Date</th>
            <th>Returned Date</th>
            {!isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredBorrows.map(
            (
              {
                _id,
                thumbnail,
                bookTitle,
                isReturned,
                dueDate,
                reviewId,
                bookSlug,
                bookId,
              },
              i,
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                {!pathname.includes("my-borrow") && (
                  <td>
                    <Badge bg={isReturned ? "success" : "warning"} text={isReturned ? undefined : "dark"}>
                      {isReturned ? "Returned" : "Borrowed"}
                    </Badge>
                    {reviewId && <small className="d-block mt-1 text-muted">Review submitted</small>}
                  </td>
                )}
                <td>
                  <a href={`/book/${bookSlug}`} target="_blank">
                    {bookTitle}
                  </a>
                </td>

                <td>
                  <img src={getImageUrl(thumbnail)} alt={bookTitle} className="table-book-cover" />
                </td>
                <td>{dueDate.slice(0, 10)}</td>
                <td>
                  {isReturned
                    ? "Available"
                    : `Will be available in ${Math.max(
                        0,
                        Math.ceil(
                          (new Date(dueDate) - currentTime) /
                            (1000 * 60 * 60 * 24),
                        ),
                      )} days`}
                </td>
                {!pathname.includes("borrow-history") && (
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                    {!isReturned && (
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => {
                          handleOnBookReturn(_id, bookId);
                        }}
                      >
                        Return Book{" "}
                      </Button>
                    )}
                    {isReturned && !reviewId && (
                      <Button
                        onClick={() => handleOnLeaveReview({ _id, bookId })}
                        variant="outline-success"
                        size="sm"
                      >
                        Leave Review{" "}
                      </Button>
                    )}
                    {reviewId && <Badge bg="success">Reviewed</Badge>}
                    </div>
                  </td>
                )}
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BorrowTable;
