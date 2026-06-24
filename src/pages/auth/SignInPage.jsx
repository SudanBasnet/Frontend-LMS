import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { signInUserAPI } from "../../services/authAPI";
import { fetchUserAPI } from "../../features/user/userAPI";
import { fetchUserAction } from "../../features/user/userAction";
import { useDispatch } from "react-redux";
const initialState = {};
const SignInPage = () => {
  const { form, handleOnChange } = useForm(initialState);
  const dispatch = useDispatch();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (form.email && form.password) {
      const { payload } = await signInUserAPI(form);
      if (payload?.accessJWT) {
        sessionStorage.setItem("accessJWT", payload.accessJWT);
        localStorage.setItem("refreshJWT", payload.refreshJWT);
        //fetch user api
        dispatch(fetchUserAction());
      }
    } else {
      alert("both inputs must be filled");
    }
  };

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
            <Form.Group className="signin-field mb-3" controlId="signin-email">
              <Form.Label>
                Email address <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                className="py-2"
                onChange={handleOnChange}
              />
            </Form.Group>

            <Form.Group
              className="signin-field mb-3"
              controlId="signin-password"
            >
              <Form.Label>
                Password <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                autoComplete="current-password"
                className="py-2"
                onChange={handleOnChange}
              />
            </Form.Group>

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
