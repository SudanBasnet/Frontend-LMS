import BookTable from "@components/tables/BookTable";
import { adminFetchAllBookAPI } from "@features/book/bookAPI";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

const Books = () => {
  useEffect(() => {
    adminFetchAllBookAPI();
  }, []);
  return (
    <div className="p-3">
      <h3>Books</h3>
      <hr />
      <div className="text-end">
        <Button>Add new Book</Button>
      </div>
      <div className="mt-4">
        <div className="d-flex justify-content-between mb-4">
          <div>10 Books(s) Found</div>
          <div className="">
            <Form.Control placeholder="Search book by name" />
          </div>
        </div>
        <BookTable />
      </div>
    </div>
  );
};

export default Books;
