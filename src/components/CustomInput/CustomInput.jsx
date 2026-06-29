import Form from "react-bootstrap/Form";
const CustomInput = ({
  label,
  controlId,
  passRef,
  groupClassName = "mb-3",
  ...rest
}) => {
  return (
    <Form.Group className={groupClassName} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} ref={passRef} />
    </Form.Group>
  );
};

export default CustomInput;
