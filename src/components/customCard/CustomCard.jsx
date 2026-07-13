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
        <Link to={"/book/" + slug} className="mt-auto text-decoration-none">
          <Button variant="dark" className="w-100">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;

export const CustomListCard = ({
  imgUrl = a,
  title = "Book Title",
  year = "2026",
  author = "Sudan Basnet",
  slug = "book-title",
  description = "",
}) => {
  return (
    <Card className="book-list-card d-flex flex-row w-100">
      <div className="book-list-card-cover">
        <img src={imgUrl} alt={title} className="book-list-card-img" />
      </div>

      <Card.Body className="book-list-card-body">
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted mb-2">
          {author} - {year}
        </Card.Text>
        {description && (
          <Card.Text className="book-list-card-description">
            {description}
          </Card.Text>
        )}
        <Link
          to={"/book/" + slug}
          className="mt-auto align-self-start d-grid text-decoration-none"
        >
          <Button variant="dark">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
