import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function BookingModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.closeFunction} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>I will not close if you click outside me. Don't even try to press escape key.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeFunction}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
