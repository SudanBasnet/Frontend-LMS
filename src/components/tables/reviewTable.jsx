import Star from "@components/star/Star";
import { updateReviewStatusAction } from "@features/review/ReviewAction";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ReviewTable = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviewInfo);
  const { user } = useSelector((state) => state.userInfo);
  const [searchText, setSearchText] = useState("");
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;

  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? apiBaseUrl + imgUrl.slice("public".length)
      : imgUrl;

  const displayReviews = reviews.filter(
    ({ title = "", userName = "", reviewMessage = "" }) =>
      title.toLowerCase().includes(searchText) ||
      userName.toLowerCase().includes(searchText) ||
      reviewMessage.toLowerCase().includes(searchText),
  );

  const handleOnSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };
  const handleOnStatusUpdate = (obj) => {
    if (confirm("Are you sure you want to change the status of this review")) {
      dispatch(updateReviewStatusAction(user?.role === "admin", obj));
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          {displayReviews.length}{" "}
          {displayReviews.length === 1 ? "Review Found" : "Reviews Found"}
        </div>
        <div>
          <Form.Control
            placeholder="Search reviews"
            onChange={handleOnSearch}
          />
        </div>
      </div>
      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Book</th>
            <th>Review Details</th>
            <th>Reviewer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayReviews.map(
            (
              {
                _id,
                isApproved,
                title,
                userName,
                rating,
                reviewMessage,
                createdAt,
                bookId,
              },
              i,
            ) => (
              <tr key={_id}>
                <td>
                  <div
                    className="d-flex align-items-center gap-3"
                    style={{ minWidth: "220px" }}
                  >
                    <strong>{i + 1}.</strong>
                    {bookId?.imgUrl ? (
                      <img
                        src={getImageUrl(bookId.imgUrl)}
                        alt={bookId.title || title}
                        width="55"
                        height="75"
                        className="rounded object-fit-cover"
                      />
                    ) : (
                      <div
                        className="rounded bg-secondary-subtle d-flex align-items-center justify-content-center text-muted"
                        style={{ width: "55px", height: "75px" }}
                      >
                        N/A
                      </div>
                    )}
                    <span>
                      <a href={"/book/" + bookId?.slug} target="_blank">
                        {bookId?.title || title}
                      </a>
                    </span>
                  </div>
                </td>
                <td style={{ minWidth: "280px", whiteSpace: "normal" }}>
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <span
                        className={isApproved ? "text-success" : "text-warning"}
                      >
                        {isApproved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <div>
                      <strong>Title:</strong> {title}
                    </div>
                    <div>
                      <strong>Message:</strong> {reviewMessage}
                    </div>
                    <div style={{ minWidth: "120px" }}>
                      <Star avgRating={rating} />
                      <span>{rating}/5</span>
                    </div>
                  </div>
                </td>
                <td style={{ minWidth: "150px" }}>
                  <div>{userName || "N/A"}</div>
                  <small className="text-muted">
                    {createdAt ? createdAt.slice(0, 10) : "N/A"}
                  </small>
                </td>
                <td style={{ minWidth: "180px" }}>
                  <div className="d-flex flex-wrap gap-2">
                    <Form.Check
                      className={isApproved ? "text-success" : "text-danger"}
                      type="switch"
                      label={isApproved ? "Approved" : "Not approved"}
                      checked={isApproved}
                      onChange={() => {
                        handleOnStatusUpdate({ _id, isApproved: !isApproved });
                      }}
                    />
                    <Button type="button" size="sm" variant="danger">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ReviewTable;
