import Alert from "react-bootstrap/Alert";

function ErrorMessage(props) {
  return (
    <Alert variant="danger" className="errormessage__alert">
      {props.children}
    </Alert>
  );
}

export default ErrorMessage;
