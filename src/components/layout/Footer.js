import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer bg="primary">
      <Container fluid>
        <Row>
          <Col>
            <Logo />
          </Col>
          <Col>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" exact className="ms-lg-3 nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/accommodations" className="ms-lg-3 nav-link">
                  Accommodations
                </NavLink>
              </li>
              <li>
                <NavLink to="/booking" className="ms-lg-3 nav-link">
                  Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="ms-lg-3 me-lg-5 nav-link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="list-unstyled">
              <li>
                <a href="#!">Inspiration</a>
              </li>
              <li>
                <a href="#!">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#!">Privacy Policy</a>
              </li>
              <li>
                <a href="#!">About Us</a>
              </li>
            </ul>
          </Col>
          <Col>
            <a href="#!">
              <i class="fab fa-facebook-f"></i>
            </a>

            <a href="#!">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#!">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#!">
              <i class="fas fa-globe-americas"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
