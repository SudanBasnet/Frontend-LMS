import CustomCard from "@components/customCard/CustomCard";
import SectionTitle from "@components/sectionTitle/SectionTitle";
import { useSelector } from "react-redux";

const BestRead = () => {
  const { publicBooks } = useSelector((state) => state.bookInfo);
  const books = publicBooks
    .filter((book) => book.available !== false && !book.expectedAvailable)
    .slice(4, 8);

  if (!books.length) return null;

  return (
    <section className="library-section">
      <SectionTitle eyebrow="Ready for checkout" title="Available now" />
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

export default BestRead;
