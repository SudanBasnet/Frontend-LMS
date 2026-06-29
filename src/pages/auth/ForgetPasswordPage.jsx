import { Alert, Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CustomInput from "@components/CustomInput/CustomInput";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useForm from "../../hooks/useForm";
const initialstate = {};

const ForgetPasswordPage = () => {
  const emailRef = useRef("");
  const { form, setForm, passwordErrors, handleOnChange } =
    useForm(initialstate);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
  };
  console.log(form);
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
            <h2 className="fw-bold mb-2">Reset your password</h2>
            <p className="text-secondary mb-0">
              If the account exists, we will email you instructions to reset the
              password.
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
              placeholder="Enter your email Address"
              autoComplete="email"
              className="py-2"
              passRef={emailRef}
            />

            <Button
              className="w-100 py-2 fw-semibold"
              variant="success"
              type="submit"
            >
              Request OTP
            </Button>
          </Form>
          <hr />
          {/* Show this below oc=nce the otp is requested */}

          <div>
            <Alert variant="success">
              We will send you an OTP if you registerd email exists in our
              system. Please check you junk/spam if you don't see your inbox
            </Alert>

            <Form className="signin-form" onSubmit={handleOnSubmit}>
              <CustomInput
                groupClassName="signin-field mb-3"
                label={
                  <>
                    OTP <span className="text-danger">*</span>
                  </>
                }
                name="OTP"
                type="number"
                required
                placeholder="Enter your OTP"
                className="py-2"
                onChange={handleOnChange}
              />
              <CustomInput
                controlId="signin-email"
                groupClassName="signin-field mb-3"
                label={
                  <>
                    New Password <span className="text-danger">*</span>
                  </>
                }
                name="password"
                type="password"
                required
                placeholder="New Password"
                className="py-2"
                onChange={handleOnChange}
              />
              <CustomInput
                controlId="signin-email"
                groupClassName="signin-field mb-3"
                label={
                  <>
                    Confirm Password <span className="text-danger">*</span>
                  </>
                }
                name="confirm password"
                type="password"
                required
                placeholder="Confirm Password"
                className="py-2"
                onChange={handleOnChange}
              />

              <Button
                className="w-100 py-2 fw-semibold"
                variant="success"
                type="submit"
              >
                Reset Password
              </Button>
            </Form>
          </div>
          <p className="text-center text-secondary mt-4 mb-0">
            Ready To Login{" "}
            <Link
              className="link-success fw-semibold text-decoration-none"
              to="/login"
            >
              Login Now
            </Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
