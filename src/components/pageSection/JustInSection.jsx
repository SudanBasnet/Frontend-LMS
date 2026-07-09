import CustomCard from "@components/customCard/CustomCard";
import SectionTitle from "@components/sectionTitle/SectionTitle";
import React from "react";
import { useSelector } from "react-redux";

const JustInSection = () => {
  const { publicBooks } = useSelector((state) => state.bookInfo);
  console.log(publicBooks);
  let books = [];
  if (publicBooks.length) {
    const sorted = [...publicBooks].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    books = sorted.slice(0, 4);
  }
  console.log(books);
  return (
    <div className="mt-5">
      <SectionTitle title="Just In" />
      <div className="row g-3">
        {books.map((book) => (
          <div className="col-12 col-sm-6 col-lg-3 d-flex" key={book._id}>
            <CustomCard {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JustInSection;
