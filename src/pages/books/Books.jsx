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
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <span>Collection management</span>
          <h1>Book inventory</h1>
          <p>Manage catalogue records, status, and borrowing availability.</p>
        </div>
        <Link to="/users/new-book">
          <Button variant="success">+ Add new book</Button>
        </Link>
      </header>
      <div className="workspace-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4">
        <BookTable />
      </div>
    </div>
  );
};

export default Books;
