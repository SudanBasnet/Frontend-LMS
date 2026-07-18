import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { signUpInputs } from "@assets/custominputs/userSignupInputs.js";
import useForm from "../../hooks/useForm.js";
import { signUpNewUserAPI } from "@services/authAPI.js";
import GoogleAuthButton from "@components/auth/GoogleAuthButton";
import { Link } from "react-router-dom";

const initialState = {};
const SignUpPage = () => {
  const { form, setForm, handleOnChange, passwordErrors } =
    useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password)
      return alert("password do not match");
    const result = await signUpNewUserAPI(rest);

    if (result?.status === "success") {
      setForm(initialState);
    }
  };

  return (
    <div className="signin-page library-auth-page d-flex align-items-center justify-content-center px-3 py-5">
      <Form
        onSubmit={handleOnSubmit}
        className="signin-glass-card signin-glass-form border border-white border-opacity-25 rounded-3 shadow-lg p-4 p-md-5 w-100"
        style={{ maxWidth: "520px" }}
      >
        <div className="mb-4">
          <p className="text-success text-uppercase fw-bold small mb-2">
            Create account
          </p>
          <h1 className="fw-bold mb-0">Join Our Library Community</h1>
        </div>

        {signUpInputs.map((input) => (
          <CustomInput
            key={input.name}
            {...input}
            value={form[input.name] || ""}
            onChange={handleOnChange}
          />
        ))}
        <div className="py-2">
          <ul className="text-danger small mb-0">
            {passwordErrors.length > 0 &&
              passwordErrors.map((msg) => <li key={msg}>{msg}</li>)}
          </ul>
        </div>

        <Button
          className="w-100 py-2 fw-semibold mt-2"
          variant="success"
          type="submit"
          disabled={passwordErrors.length}
        >
          Create account
        </Button>

        <div className="auth-divider d-flex align-items-center gap-3 my-4">
          <span className="flex-grow-1 border-top" />
          <small className="text-secondary text-uppercase">or</small>
          <span className="flex-grow-1 border-top" />
        </div>
        <GoogleAuthButton text="signup_with" destination="/users" />

        <p className="text-center text-secondary mt-4 mb-0">
          Already a member?{" "}
          <Link
            className="link-success fw-semibold text-decoration-none"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpPage;
