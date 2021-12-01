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
            {/* <Nav.Item > */}
            <Nav.Link as={NavLink} eventKey="1" to="/" exact className="ms-3 nav-link">
              HOME
            </Nav.Link>
            {/* </Nav.Item>
            <Nav.Item > */}
            <Nav.Link as={NavLink} eventKey="2" to="/accommodations" className="ms-3 nav-link">
              ACCOMMODATIONS
            </Nav.Link>
            {/* </Nav.Item>
            <Nav.Item > */}
            <Nav.Link as={NavLink} eventKey="3" to="/booking" className="ms-3 nav-link">
              BOOKING
            </Nav.Link>
            {/* </Nav.Item>
            <Nav.Item > */}
            <Nav.Link as={NavLink} eventKey="4" to="/inspiration" className="ms-3 nav-link">
              INSPIRATION
            </Nav.Link>
            {/* </Nav.Item>
            <Nav.Item > */}
            <Nav.Link as={NavLink} eventKey="5" to="/contact" className="ms-3 me-lg-5 nav-link">
              CONTACT
            </Nav.Link>
            {/* </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
