import { Link } from "react-router-dom";

function BookingMessage() {
  return (
    <>
      <h5>Thank you for your booking enquiry!</h5>
      <div className="text-start mt-3">
        <p>The establishment of your choice will contact you as soon as possible!</p>
        <p>
          In the mean time - you can go to our <Link to="/inspiration">inspiration page</Link> to read more about things to do when in Bergen.
        </p>
      </div>
    </>
  );
}

export default BookingMessage;
