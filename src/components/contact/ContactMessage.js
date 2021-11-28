import { Link } from "react-router-dom";

function ContactMessage() {
  return (
    <>
      <h5>Thank you for your reaching out!</h5>
      <div className="text-start mt-3">
        <p>We will get back to you as soon as possible!</p>
        <p>
          In the mean time - go to our <Link to="/inspiration">inspiration page</Link> to read more about things to do when in Bergen.
        </p>
      </div>
    </>
  );
}

export default ContactMessage;
