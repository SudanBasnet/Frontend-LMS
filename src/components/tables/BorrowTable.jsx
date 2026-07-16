import { getAllBorrowsAction } from "@features/borrow/borrowAction";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

const BorrowTable = () => {
  const { allBorrows } = useSelector((state) => state.borrowInfo);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime] = useState(() => Date.now());
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  useEffect(() => {
    dispatch(getAllBorrowsAction());
  }, [dispatch]);

  const query = searchTerm.trim().toLowerCase();
  const borrowList = Array.isArray(allBorrows) ? allBorrows : [];
  const filteredBorrows = borrowList.filter(({ bookTitle = "" }) =>
    bookTitle.toLowerCase().includes(query),
  );

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
            <th>Status</th>
            <th>BookTitle</th>
            <th>Thumbnail</th>
            <th>Due Date</th>
            <th>Returned Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredBorrows.map(
            ({ _id, thumbnail, bookTitle, isReturned, dueDate }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td>TODO</td>
                <td>{bookTitle}</td>

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

                <td className="d-flex">
                  <Link to={"/users/edit-book/" + _id}>
                    <Button variant="warning">Return Book </Button>
                    <Button variant="dark">Leave Review </Button>
                  </Link>
                  reviewed
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BorrowTable;
