import { getAllReviewAction } from "@features/review/ReviewAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  useEffect(() => {
    dispatch(getAllReviewAction(user?.role === "admin"));
  }, [dispatch]);
  return (
    <div>
      <h1>reviewspage</h1>
    </div>
  );
};

export default ReviewsPage;
