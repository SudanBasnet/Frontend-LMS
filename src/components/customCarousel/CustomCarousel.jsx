import Carousel from "react-bootstrap/Carousel";
import a from "@assets/img/a.jpg";
import b from "@assets/img/b.jpg";
import c from "@assets/img/c.jpg";
import { Link } from "react-router-dom";

const CustomCarousel = () => {
  return (
    <Carousel className="library-hero" fade interval={6500}>
      <Carousel.Item>
        <img src={a} alt="Rows of books inside the library" />
        <Carousel.Caption>
          <span className="library-hero__eyebrow">Your library, organised</span>
          <h1>Discover your next great read.</h1>
          <p>
            Search the catalogue, reserve a title, and keep every borrowing
            deadline in one simple place.
          </p>
          <div className="library-hero__actions">
            <Link to="/all-books" className="btn btn-library-primary">
              Explore catalogue
            </Link>
            <Link to="/signup" className="btn btn-library-ghost">
              Become a member
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={b} alt="A reader selecting a book from a shelf" />
        <Carousel.Caption>
          <span className="library-hero__eyebrow">Built for readers</span>
          <h2>Borrow with confidence.</h2>
          <p>
            See availability before you choose and follow your books from
            checkout through return.
          </p>
          <div className="library-hero__actions">
            <Link to="/all-books" className="btn btn-library-primary">
              Find a book
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={c} alt="Historic library shelves and reading hall" />
        <Carousel.Caption>
          <span className="library-hero__eyebrow">A collection with memory</span>
          <h2>Return. Review. Recommend.</h2>
          <p>
            Share what you thought and help another reader find a book worth
            opening.
          </p>
          <div className="library-hero__actions">
            <Link to="/login" className="btn btn-library-primary">
              Access your account
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
