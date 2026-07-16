import {
  getAllBorrowsAction,
  returnBorrowsAction,
} from "@features/borrow/borrowAction";

import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

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
  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <div>
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
      <Table striped bordered hover>
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
              },
              i,
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                {!pathname.includes("my-borrow") && (
                  <td>
                    {isReturned ? "Returned" : "Borrowed"}
                    {reviewId && " & Left Review"}
                  </td>
                )}
                <td>
                  <a href={`/book/${bookSlug}`} target="_blank">
                    {bookTitle}
                  </a>
                </td>

                <td>
                  <img src={getImageUrl(thumbnail)} alt="" width="60px" />
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
                  <td className="d-flex">
                    {!isReturned && (
                      <Button
                        variant="warning"
                        onClick={() => {
                          handleOnBookReturn(_id);
                        }}
                      >
                        Return Book{" "}
                      </Button>
                    )}
                    {isReturned && !reviewId && (
                      <Button variant="success">Leave Review </Button>
                    )}
                    {reviewId && "Reviewed"}
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
