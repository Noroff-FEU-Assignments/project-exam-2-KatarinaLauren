import Accordion from "react-bootstrap/Accordion";

function EnquiryItem({ id, date, accommodation, checkin, checkout, numberOfGuests, name, email, phone, message }) {
  const newDate = new Date(date);
  const formattedDate = newDate.toISOString().substring(0, 10);

  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>
        <div className="w-100 d-flex flex-row justify-content-between pe-2 pe-md-5 ps-md-3 align-items-center">
          <i className="fas fa-hotel"></i>
          <p>Booking enquiry</p>

          <p className="accordion__header--date">{formattedDate}</p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        <p className="accordion__item--bottomBorder fw-bolder">
          <label>
            {" "}
            <i className="fas fa-bed"> </i>
          </label>
          {accommodation}
        </p>
        <div className="w-100 p-0 d-flex flex-row flex-wrap justify-content-start mb-3 accordion__item--bottomBorder">
          <p className="accordion__p--no_border mb-0 p-0 me-3 me-md-5">
            <label>
              <i className="fas fa-calendar-check"></i> Check-in:
            </label>{" "}
            {checkin}
          </p>
          <p className="mb-0">
            <label>
              {" "}
              <i className="fas fa-calendar-check"></i> Check-out:
            </label>
            {checkout}
          </p>
        </div>

        <p className="accordion__item--bottomBorder">
          <label>
            <i className="fas fa-users"></i>
          </label>
          {numberOfGuests} <label className="ms-2">person(s)</label>
        </p>
        <p className="accordion__item--bottomBorder mt-5 fw-bolder">
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
          <label className="w-100 pb-3">
            <i className="fas fa-comment-dots"></i> Message &amp; special requests:{" "}
          </label>
          {message}
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default EnquiryItem;
