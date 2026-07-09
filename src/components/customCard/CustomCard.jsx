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
    <Card className="book-card w-100 h-100">
      <div className="book-card-cover">
        <img src={imgUrl} alt={title} className="book-card-img" />
      </div>

      <Card.Body className="book-card-body">
        <Card.Title className="book-card-title">{title}</Card.Title>
        <Card.Text className="book-card-meta">
          {author} - {year}
        </Card.Text>
        <Link to={slug} className="mt-auto">
          <Button variant="dark" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
