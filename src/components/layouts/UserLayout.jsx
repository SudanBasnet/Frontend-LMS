import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "./Sidebar";
import { AuthRoute } from "../auth/AuthRoute";

const UserLayout = () => {
  return (
    <AuthRoute>
      <div>
        {/* navbar */}
        <Header />
        <Container fluid>
          <Row>
            <Col md={3} xl={2} className="bg-dark text-white">
              <div className="p-3">
                <div>Welcome Back</div>
                <h4>Sudan Basnet</h4>
              </div>
              <hr />
              <SideBar />
            </Col>
            <Col md={9} xl={10}>
              {" "}
              {/* main body */}
              <main className="main">
                <Outlet />
              </main>
            </Col>
          </Row>
        </Container>

        {/* footer */}
        <Footer />
      </div>
    </AuthRoute>
  );
};

export default UserLayout;
