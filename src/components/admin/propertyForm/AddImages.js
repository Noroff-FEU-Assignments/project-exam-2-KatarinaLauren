import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddImages(props) {
  return (
    <Form onSubmit={props.addImage}>
      <Form.Group className="mb-2" controlId="controlInput1">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={props.onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default AddImages;
