import CustomInput from "@components/CustomInput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { newbookInputs } from "@assets/custominputs/bookInputs";
import useForm from "@hooks/useForm";
import { postNewBookAction } from "@features/book/bookAction";
import { useState } from "react";
import { useDispatch } from "react-redux";
const initialState = {};

const NewBookForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const dispatch = useDispatch();

  const [image, setImage] = useState();
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleOnImageSelect = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(form);
    for (const key in form) {
      console.log(key, form[key]);
      formData.append(key, form[key]);
    }
    formData.append("image", image);

    const result = await dispatch(postNewBookAction(formData));

    if (result?.status === "success") {
      setForm(initialState);
      setImage();
      setFileInputKey(Date.now());
      e.currentTarget.reset();
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
        <Form.Group className="mb-3">
          <Form.Control
            key={fileInputKey}
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleOnImageSelect}
            required
          />
        </Form.Group>
        <div className="d-grid">
          <Button type="submit"> Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default NewBookForm;
