import Form from "react-bootstrap/Form";
const CustomInput = ({
  label,
  controlId,
  passRef,
  groupClassName = "mb-3",
  value,
  ...rest
}) => {
  let valueData = value;
  if (rest.type === "date") {
    valueData = value ? value.slice(0, 10) : null;
  }

  return (
    <Form.Group className={groupClassName} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} ref={passRef} value={valueData} />
    </Form.Group>
  );
};

export default CustomInput;
