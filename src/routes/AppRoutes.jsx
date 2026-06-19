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

const AppRoutes = () => {
  return (
    <Routes>
      {/* public pages */}

      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/activate-user" element={<VerifyUser />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
      </Route>

      {/* Private Pages */}
      <Route path="/users" element={<UserLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="books" element={<Books />} />
        <Route path="new-book" element={<NewBookPage />} />
        <Route path="edit-book" element={<EditBookPage />} />
        <Route path="borrow-history" element={<BorrowPage />} />
        <Route path="book-landing" element={<BookLandingPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="user-list" element={<UserPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
