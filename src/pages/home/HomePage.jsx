import CustomCarousel from "@components/customCarousel/CustomCarousel";
import BestRead from "@components/pageSection/BestRead";
import JustInSection from "@components/pageSection/JustInSection";
import Recommendation from "@components/pageSection/Recommendation";
import { fetchAllPublicBookAction } from "@features/book/bookAction";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPublicBookAction());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          {/* hero section */}
          <CustomCarousel />
          {/* just in section */}
          <JustInSection />

          {/* Best read section */}
          <BestRead />
          {/* Reccomendation section */}
          <Recommendation />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
