import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-primary text-center text-md-start p-2">
      <Container fluid>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="m-3 align-self-center">
            <Logo breakPoint="md" />
          </div>
          <ul className="list-unstyled m-md-3">
            <li>
              <NavLink to="/" exact className="nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/accommodations" className="nav-link">
                Accommodations
              </NavLink>
            </li>
            <li>
              <NavLink to="/booking" className="nav-link">
                Booking
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="list-unstyled m-md-3">
            <li>
              <a href="#!" className="nav-link">
                Inspiration
              </a>
            </li>
            <li>
              <a href="#!" className="nav-link">
                Terms &amp; Conditions
              </a>
            </li>
            <li>
              <a href="#!" className="nav-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#!" className="nav-link">
                About Us
              </a>
            </li>
          </ul>
          <div className=" align-self-center mb-5 pb-3 m-md-0 p-md-0 mt-3">
            <a href="#!" className="p-3">
              <i class="fab fa-facebook-f"></i>
            </a>

            <a href="#!" className="p-3">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#!" className="p-3">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#!" className="p-3">
              <i class="fas fa-globe-americas"></i>
            </a>
          </div>
          <div className="position-absolute bottom-0 end-0">
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
