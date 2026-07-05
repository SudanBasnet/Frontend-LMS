import CustomInput from "@components/CustomInput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { editbookInputs } from "@assets/custominputs/bookInputs";
import useForm from "@hooks/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { updateBookAPI } from "@features/book/bookAPI";
const initialState = {};
const EditBookForm = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { form, setForm, handleOnChange } = useForm(initialState);

  const { books } = useSelector((state) => state.bookInfo);

  useEffect(() => {
    if (_id !== form._id) {
      const selectedBook = books.find((book) => book._id === _id);
      selectedBook?._id ? setForm(selectedBook) : navigate("/users/books");
    }
  }, [setForm]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const {
      addedBy,
      createdAt,
      lastupdatedby,
      slug,
      updatedAt,
      __v,
      isbn,
      available,
      averagerating,
      ...rest
    } = form;

    const result = await updateBookAPI(rest);
    console.log(result);
  };
  console.log(form);

  return (
    <div className="p-4">
      <h3> New Books Adding Page</h3>
      <hr />
      <Form className="m-2" onSubmit={handleOnSubmit}>
        <Form.Check
          name="status"
          type="switch"
          id="custom-switch"
          label={form.status?.toUpperCase()}
          onChange={handleOnChange}
          checked={form.status === "active"}
        />
        {editbookInputs.map((input) => (
          <CustomInput
            onChange={handleOnChange}
            key={input.name}
            {...input}
            value={form[input.name] ?? ""}
          />
        ))}

        <div className="mb-3">
          <hr />
          <h4>Additional Information</h4>
          <div className="mb-2">
            Added by: {form.addedBy?.name} <br />
            Date: {form.createdAt}
          </div>
          <div>
            Last Updated by: {form.lastupdatedby?.name} <br />
            Date: {form.updatedAt}
          </div>
        </div>
        <div className="d-grid">
          <Button type="submit"> Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditBookForm;
