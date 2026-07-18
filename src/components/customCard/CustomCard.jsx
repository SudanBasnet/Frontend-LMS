import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import { Link } from "react-router-dom";

const getImageUrl = (imgUrl = "") => {
  if (!/^\/?public\//.test(imgUrl)) {
    return imgUrl;
  }

  const imagePath = imgUrl.replace(/^\/?public/, "");
  return `${import.meta.env.VITE_BASE_URL}${imagePath}`;
};

const BookCoverImage = ({ src, title, className }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`${className} book-cover-placeholder`}
        role="img"
        aria-label={`Cover unavailable for ${title}`}
      >
        <span>{title?.charAt(0) || "L"}</span>
        <small>Cover unavailable</small>
      </div>
    );
  }

  return (
    <img
      src={getImageUrl(src)}
      alt={title}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

const CustomCard = ({
  imgUrl = "",
  imageList = [],
  title = "Book Title",
  year = "2026",
  author = "Sudan Basnet",
  slug = "book-title",
  genre = "General",
  available = true,
  expectedAvailable = "",
}) => {
  const coverSource = imgUrl || imageList[0] || "";

  return (
    <Card className="book-card w-100 h-100 border-0 shadow-sm">
      <div className="book-card-cover">
        <BookCoverImage
          key={coverSource}
          src={coverSource}
          title={title}
          className="book-card-img"
        />
        <Badge
          className={`book-availability ${
            available && !expectedAvailable
              ? "bg-success-subtle text-success-emphasis"
              : "bg-warning-subtle text-warning-emphasis"
          }`}
        >
          {available && !expectedAvailable ? "Available" : "On loan"}
        </Badge>
      </div>

      <Card.Body className="book-card-body d-flex flex-column p-3">
        <span className="book-card-genre small fw-bold text-uppercase">{genre}</span>
        <Card.Title className="book-card-title">{title}</Card.Title>
        <Card.Text className="book-card-meta d-flex justify-content-between gap-3 text-secondary">
          <span>{author}</span>
          <span>{year}</span>
        </Card.Text>
        <Link to={"/book/" + slug} className="mt-auto text-decoration-none d-grid">
          <Button variant="success" className="book-card-action d-flex justify-content-between align-items-center">
            View book <span aria-hidden="true">&rarr;</span>
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;

export const CustomListCard = ({
  imgUrl = "",
  imageList = [],
  title = "Book Title",
  year = "2026",
  author = "Sudan Basnet",
  slug = "book-title",
  description = "",
  genre = "General",
  available = true,
  expectedAvailable = "",
}) => {
  const coverSource = imgUrl || imageList[0] || "";

  return (
    <Card className="book-list-card d-flex flex-row w-100 border-0 shadow-sm overflow-hidden">
      <div className="book-list-card-cover">
        <BookCoverImage
          key={coverSource}
          src={coverSource}
          title={title}
          className="book-list-card-img"
        />
      </div>

      <Card.Body className="book-list-card-body d-flex flex-column flex-grow-1 p-3">
        <div className="d-flex flex-wrap justify-content-between gap-2">
          <span className="book-card-genre small fw-bold text-uppercase">{genre}</span>
          <Badge
            className={
              available && !expectedAvailable
                ? "bg-success-subtle text-success-emphasis"
                : "bg-warning-subtle text-warning-emphasis"
            }
          >
            {available && !expectedAvailable ? "Available" : "On loan"}
          </Badge>
        </div>
        <Card.Title className="book-list-card-title">{title}</Card.Title>
        <Card.Text className="book-list-card-meta text-secondary">
          {author} <span>&middot;</span> {year}
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
          <Button variant="success" className="book-card-action d-flex justify-content-between align-items-center">
            View book <span aria-hidden="true">&rarr;</span>
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
