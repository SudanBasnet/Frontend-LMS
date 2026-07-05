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
    <div className="p-3">
      <h1>EditBookPage</h1>
      <hr />
      <Link to="/users/books">
        {" "}
        <Button variant="secondary">&lt;Back</Button>
      </Link>
      <div>
        {" "}
        <EditBookForm />
      </div>
      <div className="d-grid p-3">
        <Button onClick={handleOnDelete} variant="danger">
          Delete this book{" "}
        </Button>
      </div>
    </div>
  );
};

export default EditBookPage;
