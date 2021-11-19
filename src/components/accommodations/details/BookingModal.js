import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BookingForm from "../../booking/BookingForm";

function BookingModal(props) {
  let accommodationName = "";

  if (props.accName) {
    accommodationName = props.accName;
  }
  return (
    <>
      <Modal show={props.show} onHide={props.closeFunction} backdrop="static" keyboard={false} className={"booking__modal"} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingForm accName={accommodationName} />
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
