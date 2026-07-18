import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = () => {
  return (
    <div className="site-shell">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
