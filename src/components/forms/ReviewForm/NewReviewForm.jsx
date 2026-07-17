import CustomInput from "@components/CustomInput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { newReviewInputs } from "@assets/custominputs/reviewInputs";
import useForm from "@hooks/useForm";

const initialState = {};

const NewReviewForm = ({ borrowData }) => {
  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form, borrowData);
    //form data to send to API
    const payload = {
      ...form,
      borrowId: borrowData._id,
      bookId: borrowData.bookId,
    };
  };
  return (
    <div className="p-4">
      {/* <h3>Leave your review</h3>
      <hr /> */}
      <Form className="m-2" onSubmit={handleOnSubmit}>
        {newReviewInputs.map((input) => (
          <CustomInput
            onChange={handleOnChange}
            key={input.name}
            {...input}
            value={form[input.name] ?? ""}
          />
        ))}

        <div className="d-grid">
          <Button type="submit"> Submit your Review</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewReviewForm;
