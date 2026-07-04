import { Button, Table } from "react-bootstrap";

const BookTable = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Is Available</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLFQCXk8545LGv1QxG27KKNhdcmopZlZOGP6PfhuKpYXKl9SEGKdIi7_b&s=10"
                alt=""
                width="60px"
              />
            </td>
            <td>JS book</td>
            <td>YES, NO:Available date</td>
            <td>
              <Button variant="warning">EDIT </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default BookTable;
