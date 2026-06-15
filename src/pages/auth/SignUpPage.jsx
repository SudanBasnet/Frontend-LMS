import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../components/CustomInput/CustomInput";
import { signUpInputs } from "../../assets/custominputs/userSignupInputs.js";

const SignUpPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <Form style={{ width: "450px" }} className="card p-5 mt-5 mb-5 shadow-lg">
        <h1>Join Our Library Community</h1>
        <hr />
        {signUpInputs.map((input) => (
          <CustomInput key={input.name} {...input} />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUpPage;
