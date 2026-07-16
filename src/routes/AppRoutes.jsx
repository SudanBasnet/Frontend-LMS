import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  DashboardPage,
  SignUpPage,
  SignInPage,
  ForgetPasswordPage,
  BookLandingPage,
  Books,
  EditBookPage,
  NewBookPage,
  ReviewsPage,
  UserPage,
  Profile,
  BorrowPage,
  VerifyUser,
} from "../pages/index";
import DefaultLayout from "@components/layouts/DefaultLayout";
import UserLayout from "@components/layouts/UserLayout";
import AllBooks from "@pages/books/AllBooks";
import Search from "@pages/books/Search";
import CartPage from "@pages/cart/CartPage";
import ThankYou from "@pages/cart/ThankYou";
import { useSelector } from "react-redux";

const noAccess = <h1> You do not have permission for this page</h1>;
const AppRoutes = () => {
  const { user } = useSelector((state) => state.userInfo);
  const isAdmin = user.role === "admin";
  return (
    <Routes>
      {/* public pages */}

      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:slug" element={<BookLandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/activate-user" element={<VerifyUser />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Route>

      {/* Private Pages */}
      <Route path="/users" element={<UserLayout />}>
        {/* All Users pages*/}
        <Route index element={<DashboardPage />} />
        <Route path="my-borrow" element={<BorrowPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="thank-you" element={<ThankYou />} />

        {/* Only admin access pages */}

        <Route path="books" element={isAdmin ? <Books /> : noAccess} />
        <Route path="new-book" element={isAdmin ? <NewBookPage /> : noAccess} />
        <Route
          path="edit-book/:_id"
          element={isAdmin ? <EditBookPage /> : noAccess}
        />
        <Route
          path="borrow-history"
          element={isAdmin ? <BorrowPage isAdmin /> : noAccess}
        />
        <Route path="reviews" element={isAdmin ? <ReviewsPage /> : noAccess} />
        <Route path="user-list" element={isAdmin ? <UserPage /> : noAccess} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
