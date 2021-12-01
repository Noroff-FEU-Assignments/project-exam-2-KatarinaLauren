import Alert from "react-bootstrap/Alert";

function SuccessMessage(props) {
  return (
    <Alert variant="primary" className="successmessage__alert">
      {props.children}
    </Alert>
  );
}

export default SuccessMessage;
