import Accordion from "react-bootstrap/Accordion";

function MessageItem(id, date, name, email, phone, message) {
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>
        Message <span className="ms-5">{date}</span>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <span>Name</span>
          {name}
        </p>
        <p>
          <span>Email</span>
          {email}
        </p>
        <p>
          <span>Phone</span>
          {phone}
        </p>
        <p>
          <span>Message</span>
          {message}
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default MessageItem;
