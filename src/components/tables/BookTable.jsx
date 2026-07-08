import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookTable = () => {
  const { books } = useSelector((state) => state.bookInfo);
  const [displaybook, setdisplaybook] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  useEffect(() => {
    setdisplaybook(books);
  }, [books]);
  console.log(displaybook);
  const handleOnSearch = (e) => {
    const { value } = e.target;
    const tempArg = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase()),
    );
    setdisplaybook(tempArg);
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <div>
          {displaybook.length}{" "}
          {displaybook.length > 1 ? "Books Found" : "Book Found"}{" "}
        </div>
        <div className="">
          <Form.Control
            placeholder="Search book by name"
            onChange={handleOnSearch}
          />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Is Available</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {displaybook.map(
            (
              { _id, status, title, imgUrl, available, expectedAvailable },
              i,
            ) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td
                  className={
                    status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {status}
                </td>
                <td>
                  <img
                    src={getImageUrl(imgUrl)}
                    alt=""
                    width="60px"
                  />
                </td>
                <td>{title}</td>
                <td>
                  {available
                    ? "Yes"
                    : !available && expectedAvailable
                      ? "From:" + expectedAvailable.slice(0, 10)
                      : "N/A"}
                </td>
                <td>
                  <Link to={"/users/edit-book/" + _id}>
                    <Button variant="warning">EDIT </Button>
                  </Link>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;
