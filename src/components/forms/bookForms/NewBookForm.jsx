import CustomInput from "@components/CustomInput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { newbookInputs } from "@assets/custominputs/bookInputs";
import useForm from "@hooks/useForm";
const initialState = {};
const NewBookForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="p-4">
      <h3>Insert New Books Details</h3>
      <hr />
      <Form className="m-2" onSubmit={handleOnSubmit}>
        {newbookInputs.map((input) => (
          <CustomInput onChange={handleOnChange} key={input.name} {...input} />
        ))}
        <div className="d-grid">
          <Button type="submit"> Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewBookForm;
