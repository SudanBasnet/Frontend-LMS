import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { Form } from "react-bootstrap";
import CustomInput from "@components/CustomInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useForm from "../../hooks/useForm";
import {
  requestPassResetOTPAPI,
  resetPasswordAPI,
} from "../../services/authAPI";

const initialstate = {};
const timeToRequestOTPAgain = 60;

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");

  const [showPassResetForm, setshowPassResetForm] = useState(false);
  const [isOtpPending, setIsOtpPending] = useState(false);
  const [isBtnDisabled, setisBtnDisabled] = useState(false);
  const [counter, setCounter] = useState(0);

  const { form, passwordErrors, handleOnChange } = useForm(initialstate);
  useEffect(() => {
    if (counter <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      const nextCounter = counter - 1;
      setCounter(nextCounter);

      if (isBtnDisabled && nextCounter === 0) {
        setisBtnDisabled(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter, isBtnDisabled]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    console.log(email);
    setIsOtpPending(true);
    setisBtnDisabled(true);

    //callAPI
    const response = await requestPassResetOTPAPI({ email });
    if (response?.status === "success") {
      setshowPassResetForm(true);
      setCounter(timeToRequestOTPAgain);
    } else {
      setisBtnDisabled(false);
    }
    setIsOtpPending(false);
  };

  const handleOnPAsswordResetSubmit = async (e) => {
    e.preventDefault();
    //call API
    const email = emailRef.current.value;

    const payload = {
      email,
      otp: form.OTP,
      password: form.password,
    };
    const response = await resetPasswordAPI(payload);
    console.log(response);
    if (response?.status === "success") {
      //redirect user to login page in 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 4500);
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
              disabled={isBtnDisabled}
            >
              {isOtpPending ? (
                <Spinner animation="border" size="sm" />
              ) : counter > 0 ? (
                `Request OTP in ${counter}`
              ) : (
                "Request OTP"
              )}
            </Button>
          </Form>

          {showPassResetForm && (
            <>
              {" "}
              <hr />
              {/* Show this below once the otp is requested */}
              <div>
                <Alert variant="success">
                  We will send you an OTP if you registerd email exists in our
                  system. Please check you junk/spam if you don't see your inbox
                </Alert>

                <Form
                  className="signin-form"
                  onSubmit={handleOnPAsswordResetSubmit}
                >
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
                    groupClassName="signin-field mb-3"
                    label={
                      <>
                        Confirm Password <span className="text-danger">*</span>
                      </>
                    }
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm Password"
                    className="py-2"
                    onChange={handleOnChange}
                  />
                  <div className="py-2">
                    <ul className="text-danger small mb-0">
                      {passwordErrors.length > 0 &&
                        passwordErrors.map((msg) => <li key={msg}>{msg}</li>)}
                    </ul>
                  </div>
                  <Button
                    className="w-100 py-2 fw-semibold"
                    variant="success"
                    type="submit"
                    disabled={passwordErrors.length > 0}
                  >
                    Reset Password
                  </Button>
                </Form>
              </div>
            </>
          )}
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
