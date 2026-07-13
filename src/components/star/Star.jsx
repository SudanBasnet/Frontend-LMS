import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
const maxRating = 5;

const Star = ({ avgRating, totalReviews }) => {
  if (avgRating < 0 || avgRating > 5) {
    return "";
  }
  const halfStar = !Number.isInteger(avgRating);
  const fullStar = Math.floor(avgRating);
  const emptyStar = maxRating - fullStar - (halfStar ? 1 : 0);
  const showStars = [];

  for (let i = 0; i < fullStar; i++) {
    //Show full stars
    showStars.push(<FaStar className="text-warning" />);
  }
  if (halfStar)
    //show empty stars
    showStars.push(<FaStarHalfAlt className="text-warning" />);

  for (let i = 0; i < emptyStar; i++) {
    //Show empty stars
    showStars.push(<FaRegStar />);
  }
  return (
    <div>
      {showStars} {totalReviews && totalReviews + "  Reviews"}
    </div>
  );
};

export default Star;
