import Star from "@components/star/Star";
import { formatDistance, formatDistanceToNow, subDays } from "date-fns";
const reviews = [
  {
    title: "this is awesome book",
    rating: 4.5,
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus ipsam dolorum quas veniam architecto officia quia vero, quisquam velit deleniti quam enim ipsa commodi quibusdam, ullam accusamus repudiandae alias",
    createdAt: "2026-2-4",
    reviewedBy: "Sudan Basnet",
  },
  {
    title: "this is awesome book",
    rating: 4.5,
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus ipsam dolorum quas veniam architecto officia quia vero, quisquam velit deleniti quam enim ipsa commodi quibusdam, ullam accusamus repudiandae alias",
    createdAt: "2022-2-4",
    reviewedBy: "Sudan Basnet",
  },
  {
    title: "this is awesome book",
    rating: 4.5,
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus ipsam dolorum quas veniam architecto officia quia vero, quisquam velit deleniti quam enim ipsa commodi quibusdam, ullam accusamus repudiandae alias",
    createdAt: "2022-3-5",
    reviewedBy: "Sudan Basnet",
  },
  {
    title: "this is awesome book",
    rating: 4.5,
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus ipsam dolorum quas veniam architecto officia quia vero, quisquam velit deleniti quam enim ipsa commodi quibusdam, ullam accusamus repudiandae alias",
    createdAt: "2022-3-5",
    reviewedBy: "Sudan Basnet",
  },
  {
    title: "this is awesome book",
    rating: 4.5,
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus ipsam dolorum quas veniam architecto officia quia vero, quisquam velit deleniti quam enim ipsa commodi quibusdam, ullam accusamus repudiandae alias",
    createdAt: "2022-3-5",
    reviewedBy: "Sudan Basnet",
  },
  {
    title: "this is awesome book",
    rating: 4.5,
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus ipsam dolorum quas veniam architecto officia quia vero, quisquam velit deleniti quam enim ipsa commodi quibusdam, ullam accusamus repudiandae alias",
    createdAt: "2022-3-5",
    reviewedBy: "Sudan Basnet",
  },
];

const Reviews = () => {
  return (
    <div className="reviews-tab">
      {reviews.map((r, i) => (
        <div
          key={i}
          className="border rounded p-3 shadow-lg d-flex review-item gap-4"
        >
          <div className="left d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center fs-3 fw-bold">
              SB
            </div>
          </div>
          <div className="right">
            <h3>{r.title}</h3>
            <div className="d-flex gap-3">
              {" "}
              <Star avgRating={r.rating} />
              <span>
                {formatDistanceToNow(new Date(r.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <p>{r.details}</p>
            <div className="text-end"> {r.reviewedBy}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
