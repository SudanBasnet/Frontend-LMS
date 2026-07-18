import CustomCard from "@components/customCard/CustomCard";
import SectionTitle from "@components/sectionTitle/SectionTitle";
import { useSelector } from "react-redux";

const Recommendation = () => {
  const { publicBooks } = useSelector((state) => state.bookInfo);
  const books = publicBooks.slice(8, 12);

  if (!books.length) return null;

  return (
    <section className="library-section library-section--last">
      <SectionTitle eyebrow="Keep exploring" title="More from the shelves" />
      <div className="row g-4">
        {books.map((book) => (
          <div className="col-12 col-sm-6 col-lg-3 d-flex" key={book._id}>
            <CustomCard {...book} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendation;
