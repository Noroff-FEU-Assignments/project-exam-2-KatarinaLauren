import Accordion from "react-bootstrap/Accordion";

function MessageItem({ id, date, name, email, phone, message }) {
  const newDate = new Date(date);
  const formattedDate = newDate.toISOString().substring(0, 10);
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>
        <i className="far fa-envelope ps-3"></i>

        <p className="ms-4">{formattedDate}</p>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <label>
            {" "}
            <i className="fas fa-user"> </i>
          </label>
          {name}
        </p>
        <p>
          <label>
            {" "}
            <i className="fas fa-envelope-open"> </i>
          </label>
          {email}
        </p>
        <p>
          <label>
            <i className="fas fa-phone-alt"></i>
          </label>
          {phone}
        </p>
        <p className="message__p--no_border">
          <label className="w-100 pb-3">Message: </label>
          {message}
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default MessageItem;
