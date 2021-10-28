import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container fluid>
        <NavLink to="/" exact className="nav-link">
          <Navbar.Brand>HOLIDAZE BERGEN</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" exact className="ms-lg-3 nav-link">
              HOME
            </NavLink>
            <NavLink to="/accommodations" className="ms-lg-3 nav-link">
              ACCOMMODATIONS
            </NavLink>
            <NavLink to="/booking" className="ms-lg-3 nav-link">
              BOOKING
            </NavLink>
            <NavLink to="/contact" className="ms-lg-3 me-lg-5 nav-link">
              CONTACT
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/admin" className="ms-lg-5 me-lg-0 pe-lg-0 mt-5 mt-lg-auto nav-link">
              Admin
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
