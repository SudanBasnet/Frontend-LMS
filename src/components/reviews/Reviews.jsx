import Star from "@components/star/Star";
import { formatDistanceToNow } from "date-fns";

const Reviews = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <div className="text-center text-muted py-4">
        No approved reviews for this book yet.
      </div>
    );
  }

  return (
    <div className="reviews-tab">
      {reviews.map(
        ({ _id, title, rating, reviewMessage, createdAt, userName }) => (
          <div
            key={_id}
            className="border rounded p-3 shadow-lg d-flex review-item gap-4"
          >
            <div className="left d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center fs-3 fw-bold">
                <span>{userName?.split(" ")[0][0].toUpperCase()}</span>
                {"  "}
                <span>{userName?.split(" ").at(-1)[0].toUpperCase()}</span>
              </div>
            </div>
            <div className="right">
              <h3>{title}</h3>
              <div className="d-flex gap-3">
                <Star avgRating={rating} />
                <span>
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <p>{reviewMessage}</p>
              <div className="text-end">{userName || "Anonymous"}</div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default Reviews;
