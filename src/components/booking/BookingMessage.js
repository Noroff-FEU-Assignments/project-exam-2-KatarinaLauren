import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function BookingMessage() {
  return (
    <Alert variant="white" className="contact__form__alert">
      <h5>Thank you for your booking enquiry!</h5>
      <div className="text-start mt-3">
        <p>The establishment of your choice will contact you as soon as possible!</p>
        <p>
          In the mean time - go to our <Link to="/inspiration">inspiration page</Link> to read more about things to do when in Bergen. Or click the button below to make a new enquiry.
        </p>
      </div>
    </Alert>
  );
}

export default BookingMessage;
