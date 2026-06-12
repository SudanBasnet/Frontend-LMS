import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = () => {
  return (
    <div>
      {/* navbar */}
      <Header />

      {/* main body */}
      <main className="main">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
