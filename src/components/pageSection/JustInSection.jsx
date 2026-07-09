import CustomCard from "@components/customCard/CustomCard";
import SectionTitle from "@components/sectionTitle/SectionTitle";
import React from "react";

const JustInSection = () => {
  return (
    <div className="mt-5">
      <SectionTitle title="Just In" />
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <CustomCard />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <CustomCard />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <CustomCard />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 d-flex">
          <CustomCard />
        </div>
      </div>
    </div>
  );
};

export default JustInSection;
