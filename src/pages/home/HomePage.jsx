import CustomCarousel from "@components/customCarousel/CustomCarousel";
import BestRead from "@components/pageSection/BestRead";
import JustInSection from "@components/pageSection/JustInSection";
import Recommendation from "@components/pageSection/Recommendation";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
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
