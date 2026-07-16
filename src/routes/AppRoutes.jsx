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

const AppRoutes = () => {
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
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<Books />} />
        <Route path="new-book" element={<NewBookPage />} />
        <Route path="edit-book/:_id" element={<EditBookPage />} />
        <Route path="borrow-history" element={<BorrowPage />} />
        <Route path="my-borrow" element={<BorrowPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="user-list" element={<UserPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="thank-you" element={<ThankYou />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
