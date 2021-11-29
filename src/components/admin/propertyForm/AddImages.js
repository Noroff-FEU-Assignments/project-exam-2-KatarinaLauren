import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddImages(props) {
  return (
    <Form onSubmit={props.addImage} className="addImages__form p-2 psm-3 pe-md-5 ps-md-5">
      <div className="d-flex flex-row justify-content-center align-items-center">
        <Form.Group className="mb-2 align-self-center w-100" controlId="controlInput1">
          <Form.Label>Add image</Form.Label>
          <Form.Control type="file" onChange={props.onChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4 align-self-center">
          Add
        </Button>
      </div>
      {props.imageName && (
        <p className="fw-bold text-center pb-0 mb-0">
          {props.imageName} <i className="far fa-trash-alt" onClick={props.deleteImage}></i>
        </p>
      )}
    </Form>
  );
}

export default AddImages;
