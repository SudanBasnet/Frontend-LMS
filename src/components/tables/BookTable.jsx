import { useState } from "react";
import { Badge, Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BookTable = () => {
  const { books } = useSelector((state) => state.bookInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  const displaybook = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="table-toolbar d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div className="table-result-count fw-bold">
          {displaybook.length}{" "}
          {displaybook.length > 1 ? "Books Found" : "Book Found"}{" "}
        </div>
        <div className="">
          <Form.Control
            placeholder="Search book by name"
            value={searchTerm}
            onChange={handleOnSearch}
          />
        </div>
      </div>
      <Table responsive hover className="library-table align-middle">
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
                <td>
                  <Badge bg={status === "active" ? "success" : "danger"}>
                    {status}
                  </Badge>
                </td>
                <td>
                  <img src={getImageUrl(imgUrl)} alt={title} className="table-book-cover" />
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
                    <Button size="sm" variant="outline-success">Edit</Button>
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
