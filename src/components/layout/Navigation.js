import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary">
      <Container fluid>
        <NavLink to="/" exact className="nav-link m-auto ps-5 p-lg-0">
          <Logo breakPoint="lg" />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" timeout="500">
          <Nav className="ms-auto">
            <Nav.Link eventKey="1">
              <NavLink to="/" exact className="ms-3 nav-link">
                HOME
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey="2">
              <NavLink to="/accommodations" className="ms-3 nav-link">
                ACCOMMODATIONS
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey="3">
              <NavLink to="/booking" className="ms-3 nav-link">
                BOOKING
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey="4">
              <NavLink to="/inspiration" className="ms-3 nav-link">
                INSPIRATION
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey="5">
              <NavLink to="/contact" className="ms-3 me-lg-5 nav-link">
                CONTACT
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
