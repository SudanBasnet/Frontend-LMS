import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { signInUserAPI } from "@services/authAPI";
import { autoLoginUser, fetchUserAction } from "@features/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomInput from "@components/CustomInput/CustomInput";
import GoogleAuthButton from "@components/auth/GoogleAuthButton";
import { storeAuthTokens } from "@/utils/authSession";

const initialState = { email: "", password: "" };

const SignInPage = () => {
  const { form, handleOnChange } = useForm(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckingSession, setIsCheckingSession] = useState(
    () =>
      Boolean(sessionStorage.getItem("accessJWT")) ||
      Boolean(localStorage.getItem("refreshJWT")),
  );
  const { user } = useSelector((state) => state.userInfo);
  const location = useLocation();

  const path = location?.state?.from ?? "/users";

  useEffect(() => {
    user?._id ? navigate(path) : dispatch(autoLoginUser());
  }, [user?._id, navigate, dispatch, path]);

  useEffect(() => {
    if (!isCheckingSession) return undefined;

    const timer = setTimeout(() => setIsCheckingSession(false), 2000);
    return () => clearTimeout(timer);
  }, [isCheckingSession]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      const { payload } = await signInUserAPI(form);
      if (payload?.accessJWT) {
        storeAuthTokens(payload);
        //fetch user api
        dispatch(fetchUserAction());
      }
    } else {
      alert("both inputs must be filled");
    }
  };
  if (isCheckingSession) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="signin-page d-flex align-items-center justify-content-center p-3 p-md-5">
      <Card
        className="signin-glass-card border border-white border-opacity-25 shadow-lg overflow-hidden w-100"
        style={{ maxWidth: "500px", borderRadius: "1rem" }}
      >
        <Card.Body className="signin-glass-form p-4 p-sm-5">
          <div className="text-center mb-4">
            <p className="text-success text-uppercase fw-bold small mb-2">
              Library Management System
            </p>
            <h2 className="fw-bold mb-2">Sign in</h2>
            <p className="text-secondary mb-0">
              Enter your account details to continue.
            </p>
          </div>

          <Form className="signin-form" onSubmit={handleOnSubmit}>
            <CustomInput
              controlId="signin-email"
              groupClassName="signin-field mb-3"
              label={
                <>
                  Email address <span className="text-danger">*</span>
                </>
              }
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="py-2"
              onChange={handleOnChange}
              value={form.email}
            />

            <CustomInput
              controlId="signin-password"
              groupClassName="signin-field mb-3"
              label={
                <>
                  Password <span className="text-danger">*</span>
                </>
              }
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
              className="py-2"
              onChange={handleOnChange}
              value={form.password}
            />

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
              <Form.Check
                type="checkbox"
                id="remember-me"
                label="Remember me"
              />
              <Link
                className="link-success fw-semibold text-decoration-none"
                to="/forget-password"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              className="w-100 py-2 fw-semibold"
              variant="success"
              type="submit"
            >
              Sign In
            </Button>
          </Form>

          <div className="auth-divider d-flex align-items-center gap-3 my-4">
            <span className="flex-grow-1 border-top" />
            <small className="text-secondary text-uppercase">or</small>
            <span className="flex-grow-1 border-top" />
          </div>
          <GoogleAuthButton text="signin_with" destination={path} />

          <p className="text-center text-secondary mt-4 mb-0">
            New to the library?{" "}
            <Link
              className="link-success fw-semibold text-decoration-none"
              to="/signup"
            >
              Create an account
            </Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignInPage;
