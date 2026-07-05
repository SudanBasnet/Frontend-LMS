import EditBookForm from "@components/forms/bookForms/EditBookForm";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const EditBookPage = () => {
  return (
    <div className="p-3">
      <h1>EditBookPage</h1>
      <hr />
      <Link to="/users/books">
        {" "}
        <Button variant="secondary">&lt;Back</Button>
      </Link>

      <EditBookForm />
    </div>
  );
};

export default EditBookPage;
