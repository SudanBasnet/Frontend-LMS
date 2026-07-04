import BookTable from "@components/tables/BookTable";
import { adminFetchAllBookAction } from "@features/book/bookAction";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Books = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminFetchAllBookAction());
  }, [dispatch]);
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
