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
    <div className="workspace-page container-fluid py-4 px-3 px-lg-4">
      <header className="workspace-header d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <span>Community standards</span>
          <h1>Review moderation</h1>
          <p>Approve useful reader feedback before it appears publicly.</p>
        </div>
      </header>
      <div className="workspace-panel bg-white border rounded-3 shadow-sm p-3 p-lg-4">
        <ReviewTable />
      </div>
    </div>
  );
};

export default ReviewsPage;
