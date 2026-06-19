import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { signUpInputs } from "../../assets/custominputs/userSignupInputs.js";
import useForm from "../../hooks/useForm.js";
import { signUpNewUserAPI } from "../../services/authAPI.js";

const initialState = {};
const SignUpPage = () => {
  const { form, setForm, handleOnChange, passwordErrors } =
    useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const { confirmPassword, ...rest } = form;

    if (confirmPassword !== rest.password)
      return alert("password do not match");
    const result = await signUpNewUserAPI(rest);
    console.log(result);

    if (result?.status === "success") {
      setForm(initialState);
    }

    console.log(passwordErrors);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <Form
        onSubmit={handleOnSubmit}
        className="bg-white border rounded-3 shadow-lg p-4 p-md-5 w-100"
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUpPage;
