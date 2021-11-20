import Alert from "react-bootstrap/Alert";

function ErrorMessage() {
  return (
    <Alert variant="danger" className="errormessage__alert">
      <h5>An error has occurred</h5>
      <p>Please refresh the page and try again.</p>
      <p>
        If you are unable to reach us though our contact forms - send us an email about the problem on <span className="errormessage__alert--bold">post@holidaze.no</span>
      </p>
    </Alert>
  );
}

export default ErrorMessage;
