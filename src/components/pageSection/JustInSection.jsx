import CustomCard from "@components/customCard/CustomCard";
import SectionTitle from "@components/sectionTitle/SectionTitle";
import { useSelector } from "react-redux";

const JustInSection = () => {
  const { publicBooks } = useSelector((state) => state.bookInfo);
  let books = [];
  if (publicBooks.length) {
    const sorted = [...publicBooks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    books = sorted.slice(0, 4);
  }
  if (!books.length) return null;

  return (
    <section className="library-section">
      <SectionTitle
        eyebrow="Recently catalogued"
        title="New arrivals"
        linkText="View all books"
      />
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

export default JustInSection;
