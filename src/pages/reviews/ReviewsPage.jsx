import ReviewTable from "@components/tables/reviewTable";
import { getAllReviewAction } from "@features/review/ReviewAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  useEffect(() => {
    dispatch(getAllReviewAction(user?.role === "admin"));
  }, [dispatch, user?.role]);
  return (
    <div className="p-3">
      <h3>Reviews</h3>
      <hr />
      <div className="text-end">Reviews</div>
      <div className="mt-4">
        <ReviewTable />
      </div>
    </div>
  );
};

export default ReviewsPage;
