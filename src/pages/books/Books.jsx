import BookTable from "@components/tables/BookTable";
import { adminFetchAllBookAction } from "@features/book/bookAction";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
        <Link to="/users/new-book">
          <Button>Add new Book</Button>
        </Link>
      </div>
      <div className="mt-4">
        <BookTable />
      </div>
    </div>
  );
};

export default Books;
