import CustomInput from "@components/CustomInput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { newbookInputs } from "@assets/custominputs/bookInputs";
import useForm from "@hooks/useForm";
import { postNewBookAction } from "@features/book/bookAction";
const initialState = {};
const NewBookForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const result = await postNewBookAction(form);

    if (result?.status === "success") {
      setForm(initialState);
    }
  };
  return (
    <div className="p-4">
      <h3>Insert New Books Details</h3>
      <hr />
      <Form className="m-2" onSubmit={handleOnSubmit}>
        {newbookInputs.map((input) => (
          <CustomInput
            onChange={handleOnChange}
            key={input.name}
            {...input}
            value={form[input.name] ?? ""}
          />
        ))}
        <div className="d-grid">
          <Button type="submit"> Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewBookForm;
