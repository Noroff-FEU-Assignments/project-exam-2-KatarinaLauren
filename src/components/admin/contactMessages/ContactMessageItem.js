import Accordion from "react-bootstrap/Accordion";

function ContactMessageItem({ id, date, name, email, phone, message, deletePost }) {
  const newDate = new Date(date);
  const formattedDate = newDate.toISOString().substring(0, 10);
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>
        <div className="w-100 d-flex flex-row justify-content-between pe-2 pe-md-5 ps-md-3 align-items-center">
          <i className="fas fa-envelope"></i>
          {name}
          <p className="accordion__header--date">{formattedDate}</p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p className="accordion__item--bottomBorder">
          <label>
            {" "}
            <i className="fas fa-user"> </i>
          </label>
          {name}
        </p>
        <p className="accordion__item--bottomBorder">
          <label>
            {" "}
            <i className="fas fa-envelope-open"> </i>
          </label>
          {email}
        </p>
        <p className="accordion__item--bottomBorder">
          <label>
            <i className="fas fa-phone-alt"></i>
          </label>
          {phone}
        </p>
        <p>
          <label className="w-100 pb-2">
            {" "}
            <i className="fas fa-comment-dots"></i>
          </label>
          {message}
        </p>
        <div className="text-end mt-3 pb-0 mb-0 accordion__deleteButton">
          <i className="fas fa-trash-alt p-2 pe-0" onClick={deletePost} data-remove={id}></i>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default ContactMessageItem;
