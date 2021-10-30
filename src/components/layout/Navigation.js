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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
