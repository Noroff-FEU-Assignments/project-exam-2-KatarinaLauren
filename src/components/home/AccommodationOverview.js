import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import bb from "../../images/home/bb.jpg";
import hotel from "../../images/home/hotel.jpg";
import cottage from "../../images/home/cottage.jpg";

function AccommodationOverview() {
  return (
    <Link to="/accommodations">
      <Row>
        <Col xs sm md={6}>
          <div style={{ backgroundImage: `url(${hotel})` }} className="home__div--accommodation m-auto mt-5 mb-5 position-relative">
            <h5 className="position-absolute h2">Full service Hotels</h5>
          </div>
          <div style={{ backgroundImage: `url(${bb})` }} className="home__div--accommodation m-auto mt-5 mb-5 position-relative">
            <h5 className="position-absolute h2">Cozy B&amp;Bs</h5>
          </div>
        </Col>
        <Col xs={12} md={6} className="align-self-center">
          <div style={{ backgroundImage: `url(${cottage})` }} className="home__div--accommodation m-auto mb-5 position-relative">
            <h5 className="position-absolute h2">Guesthouses &amp; Cottages</h5>
          </div>
        </Col>
      </Row>
    </Link>
  );
}

export default AccommodationOverview;
