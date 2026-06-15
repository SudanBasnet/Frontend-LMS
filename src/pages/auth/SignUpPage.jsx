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
  };
  console.log(passwordErrors);
  return (
    <div className="d-flex justify-content-center">
      <Form
        onSubmit={handleOnSubmit}
        style={{ width: "450px" }}
        className="card p-5 mt-5 mb-5 shadow-lg"
      >
        <h1>Join Our Library Community</h1>
        <hr />
        {signUpInputs.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}
        <div className="py-3">
          <ul className="text-danger">
            {passwordErrors.length > 0 &&
              passwordErrors.map((msg) => <li key={msg}>{msg}</li>)}
          </ul>
        </div>

        <Button
          variant="primary"
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
