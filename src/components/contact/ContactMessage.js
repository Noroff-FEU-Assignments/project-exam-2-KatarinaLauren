import Alert from "react-bootstrap/Alert";

function ContactMessage({ children }) {
  return (
    <Alert variant="white" className="contact__form__alert">
      {children}
    </Alert>
  );
}

export default ContactMessage;
