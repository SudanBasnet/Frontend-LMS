import { NewBookForm } from "@components/forms";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewBookPage = () => {
  return (
    <div className="p-3">
      <div className="p-3">NewbookPage</div>
      <hr />
      <Link to="/users/books">
        {" "}
        <Button variant="secondary">&lt;Back</Button>
      </Link>
      <NewBookForm />
    </div>
  );
};

export default NewBookPage;
