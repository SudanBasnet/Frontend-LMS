import CustomInput from "@components/CustomInput/CustomInput";
import { Button, Form } from "react-bootstrap";
import { editbookInputs } from "@assets/custominputs/bookInputs";
import useForm from "@hooks/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateBookAPI } from "@features/book/bookAPI";
const initialState = {};
const EditReviewForm = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { form, setForm, handleOnChange } = useForm(initialState);

  const { books } = useSelector((state) => state.bookInfo);
  const getImageUrl = (imgUrl = "") =>
    imgUrl.startsWith("public")
      ? import.meta.env.VITE_BASE_URL + imgUrl.slice("public".length)
      : imgUrl;
  const displayImages = [
    form.imgUrl,
    ...(Array.isArray(form.imageList) ? form.imageList : []),
  ].filter((img, index, images) => img && images.indexOf(img) === index);

  const [images, setImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [imgToDelete, setImgToDelete] = useState([]);

  const handleOnImageSelect = (e) => {
    console.log(e.target.files);
    const files = [...e.target.files];
    if (files.length > 2) {
      e.target.value = "";
      setImages([]);
      return alert("only 2 images allowed");
    }
    setImages([...e.target.files]);
  };

  useEffect(() => {
    if (_id !== form._id) {
      const selectedBook = books.find((book) => book._id === _id);
      selectedBook?._id ? setForm(selectedBook) : navigate("/users/books");
    }
  }, [setForm]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (imgToDelete.includes(form.imgUrl)) {
      return alert("you can not delete the selected thumbnail");
    }
    const {
      addedBy,
      createdAt,
      lastupdatedby,
      slug,
      updatedAt,
      __v,
      isbn,
      available,
      imageList,
      averagerating,
      ...rest
    } = form;
    const formData = new FormData();
    console.log(rest);
    for (const key in rest) {
      formData.append(key, rest[key]);
    }
    formData.append("imageList", JSON.stringify(imageList || []));
    images.map((img) => formData.append("images", img));
    formData.append("imgToDelete", JSON.stringify(imgToDelete));

    const result = await updateBookAPI(formData);
    console.log(result);

    if (result?.status === "success") {
      result.payload?._id && setForm(result.payload);
      setImages([]);
      setImgToDelete([]);
      setFileInputKey(Date.now());
      e.currentTarget.reset();
    }
  };
  const handleOnImageToDelete = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    checked
      ? setImgToDelete([...imgToDelete, value])
      : setImgToDelete(imgToDelete.filter((img) => img !== value));
  };
  console.log(imgToDelete);

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

        {displayImages.length > 0 && (
          <div className="m-3 d-flex gap-2 flex-wrap">
            {displayImages.map((img) => (
              <div key={img}>
                <div className="mt-2">
                  <Form.Check
                    type="radio"
                    name="imgUrl"
                    label={"Thumbnail"}
                    value={img}
                    checked={form.imgUrl === img}
                    onChange={handleOnChange}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Delete"
                    value={img}
                    onChange={handleOnImageToDelete}
                  />
                </div>
                <img
                  src={getImageUrl(img)}
                  alt="book"
                  width="200px"
                  className="img-thumbnail"
                />
              </div>
            ))}
          </div>
        )}
        <Form.Group className="mb-3">
          <Form.Label className="">
            Upload More Images (max 2 allowed)
          </Form.Label>
          <Form.Control
            key={fileInputKey}
            type="file"
            name="images"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleOnImageSelect}
            multiple
          />
        </Form.Group>
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
        <div className="d-grid ">
          <Button type="submit " variant="warning">
            {" "}
            Update Book
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditReviewForm;
