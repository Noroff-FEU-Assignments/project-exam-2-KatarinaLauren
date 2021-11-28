import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";

function AdminNav() {
  return (
    <Container fluid className="adminNav__container pt-1">
      <div className="adminNav__container__div p-1 mb-4 d-flex flex-row flex-wrap justify-content-around justify-content-sm-evenly">
        <NavLink to="/add" className="nav-link">
          <i className="fas fa-plus me-2"></i> ADD
        </NavLink>

        <NavLink to="/remove" className="nav-link">
          <i className="fas fa-pen me-2"></i> EDIT/REMOVE
        </NavLink>

        <NavLink to="/enquiries" className="nav-link">
          <i className="fas fa-calendar me-2"></i> ENQUIRIES
        </NavLink>

        <NavLink to="/messages" className="nav-link">
          <i className="fas fa-envelope-open me-2"></i> MESSAGES
        </NavLink>
      </div>
    </Container>
  );
}

export default AdminNav;
