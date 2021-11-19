import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

function SuccessMessage() {
  return (
    <Alert variant="light">
      <h5>Thank you for your booking enquiry!</h5>
      <div className="text-start mt-3">
        <p>The establishment of your choice will contact you as soon as possible!</p>
        <p>
          In the mean time - go to our <Link to="/inspiration">inspiration page</Link> to read more about things to do when in Bergen. Or click the button below to make a new enquiry.
        </p>
      </div>
      <Link to="/booking" className="ms-3 nav-link">
        <Button variant="success">Make a new enquiry</Button>
      </Link>
    </Alert>
  );
}

export default SuccessMessage;
