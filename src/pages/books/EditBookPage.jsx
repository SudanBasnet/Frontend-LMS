import EditBookForm from "@components/forms/bookForms/EditBookForm";
import { deleteBookAPI } from "@features/book/bookAPI";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBookPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const handleOnDelete = async () => {
    if (
      confirm("Are you sure you want to delete this book. This can't be undone")
    ) {
      const result = await deleteBookAPI(_id);
      result.status === "success" && navigate("/users/books");
    }
  };
  return (
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <span>Collection management</span>
          <h1>Edit book record</h1>
          <p>Update catalogue information, images, status, and availability.</p>
        </div>
        <Link to="/users/books">
          <Button variant="outline-secondary">&larr; Back to inventory</Button>
        </Link>
      </header>
      <div className="workspace-panel library-form-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4">
        <EditBookForm />
        <div className="library-danger-zone d-flex flex-wrap justify-content-between align-items-center gap-3 border-top pt-4 mt-4">
          <div>
            <strong>Delete this book</strong>
            <span>This permanently removes the catalogue record.</span>
          </div>
          <Button onClick={handleOnDelete} variant="outline-danger">
            Delete book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
