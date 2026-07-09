import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import a from "@assets/img/a.jpg";
import { Link } from "react-router-dom";
const CustomCard = ({
  imgUrl = a,
  title = "Book Title",
  year = "2026",
  author = "Sudan Basnet",
  slug = "book-title",
}) => {
  return (
    <Card className="shadow-lg w-100">
      <div className="m-2">
        <Card.Img variant="top" src={imgUrl} className="rounded" />
      </div>

      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {author} - {year}
        </Card.Text>
        <Link to={slug}>
          <Button variant="dark">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
