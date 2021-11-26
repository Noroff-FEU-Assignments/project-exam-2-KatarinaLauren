import Accordion from "react-bootstrap/Accordion";

function EnquiryItem({ id, date, accommodation, checkin, checkout, numberOfGuests, name, email, phone, message }) {
  const newDate = new Date(date);
  const formattedDate = newDate.toISOString().substring(0, 10);

  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>
        <p>Booking enquiry</p>

        <p className="ms-4">{formattedDate}</p>
      </Accordion.Header>
      <Accordion.Body>
        <p>
          <label>
            {" "}
            <i className="fas fa-bed"> </i>
          </label>
          {accommodation}
        </p>
        <p>
          <label>
            {" "}
            Check-in
            <i className="fas fa-calendar-check"></i>
          </label>
          {checkin}
        </p>
        <p>
          <label>
            {" "}
            Check-out
            <i className="fas fa-calendar-check"></i>
          </label>
          {checkout}
        </p>

        <p>
          <label>
            Number of guests
            <i class="fas fa-users"></i>
          </label>
          {numberOfGuests}
        </p>
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
          <label className="w-100 pb-3">Message &amp; special requests: </label>
          {message}
        </p>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default EnquiryItem;
