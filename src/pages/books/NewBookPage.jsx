import { NewBookForm } from "@components/forms";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewBookPage = () => {
  return (
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <span>Collection management</span>
          <h1>Add a new book</h1>
          <p>Create a complete catalogue record for readers and staff.</p>
        </div>
        <Link to="/users/books">
          <Button variant="outline-secondary">&larr; Back to inventory</Button>
        </Link>
      </header>
      <div className="workspace-panel library-form-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4">
        <NewBookForm />
      </div>
    </div>
  );
};

export default NewBookPage;
