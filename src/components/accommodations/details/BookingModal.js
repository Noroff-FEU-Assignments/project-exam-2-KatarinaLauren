import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BookingForm from "../../booking/BookingForm";

function BookingModal(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.closeFunction} backdrop="static" keyboard={false} className={"booking__modal"} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeFunction}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
