import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  LuBookMarked,
  LuBookOpen,
  LuCalendarClock,
  LuMessageSquareText,
} from "react-icons/lu";
import { Card, Col, Row } from "react-bootstrap";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.userInfo);
  const { publicBooks } = useSelector((state) => state.bookInfo);
  const { myBorrows, allBorrows } = useSelector((state) => state.borrowInfo);
  const { reviews } = useSelector((state) => state.reviewInfo);
  const isAdmin = user.role === "admin";
  const borrowList = isAdmin ? allBorrows : myBorrows;
  const activeBorrows = borrowList.filter((item) => !item.isReturned).length;
  const returnedBooks = borrowList.filter((item) => item.isReturned).length;

  return (
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span>{isAdmin ? "Library operations" : "Member overview"}</span>
          <h1>Good to see you, {user.fName || "reader"}.</h1>
          <p>
            {isAdmin
              ? "Monitor the collection and keep daily library activity moving."
              : "Keep track of your reading activity and discover what to borrow next."}
          </p>
        </div>
        <span className="workspace-header__date">
          {new Intl.DateTimeFormat("en-AU", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(new Date())}
        </span>
      </header>

      <Row className="g-3 mb-4" aria-label="Account overview">
        {[
          [LuBookOpen, publicBooks.length, "Catalogue titles"],
          [LuBookMarked, activeBorrows, "Currently borrowed"],
          [LuCalendarClock, returnedBooks, "Books returned"],
          [LuMessageSquareText, reviews.length, isAdmin ? "Reviews to manage" : "Community reviews"],
        ].map(([Icon, value, label]) => (
          <Col sm={6} xl={3} key={label}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex align-items-center gap-3 p-4">
                <span className="workspace-stat__icon"><Icon /></span>
                <div className="d-flex flex-column"><strong className="fs-2 lh-1">{value}</strong><span className="small text-secondary mt-1">{label}</span></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <section className="workspace-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4">
        <div className="workspace-panel__heading">
          <div>
            <span>Quick access</span>
            <h2>{isAdmin ? "Manage the library" : "Continue your library journey"}</h2>
          </div>
        </div>
        <Row className="workspace-actions g-3">
          <Col lg><Link className="d-grid h-100 p-3 border rounded-3 text-decoration-none" to={isAdmin ? "/users/books" : "/all-books"}>
            <LuBookOpen />
            <div><strong>{isAdmin ? "Book inventory" : "Browse catalogue"}</strong><span>{isAdmin ? "Add, edit and check availability" : "Find your next title"}</span></div>
            <span>&rarr;</span>
          </Link></Col>
          <Col lg><Link className="d-grid h-100 p-3 border rounded-3 text-decoration-none" to={isAdmin ? "/users/borrow-history" : "/users/my-borrow"}>
            <LuBookMarked />
            <div><strong>{isAdmin ? "Circulation history" : "My borrowed books"}</strong><span>{isAdmin ? "Review all loans and returns" : "Check due dates and returns"}</span></div>
            <span>&rarr;</span>
          </Link></Col>
          <Col lg><Link className="d-grid h-100 p-3 border rounded-3 text-decoration-none" to={isAdmin ? "/users/reviews" : "/users/profile"}>
            <LuMessageSquareText />
            <div><strong>{isAdmin ? "Review moderation" : "Member profile"}</strong><span>{isAdmin ? "Approve reader feedback" : "View your account details"}</span></div>
            <span>&rarr;</span>
          </Link></Col>
        </Row>
      </section>
    </div>
  );
};

export default DashboardPage;
