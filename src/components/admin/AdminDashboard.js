import PageHeading from "../layout/PageHeading";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AdminDashboard() {
  return (
    <>
      <PageHeading color={"#02a6b5"} className={"text-center mt-5"}>
        ADMIN
      </PageHeading>
      <div className="admindash__container p-4 mt-5 mb-4 text-center">
        <h5>Property administration</h5>
        <Link to="/add">
          <Button variant="outline-primary" className="mt-3">
            Add property
          </Button>
        </Link>
        <Link to="/remove">
          <Button variant="outline-primary" className="mt-3">
            Edit/remove property
          </Button>
        </Link>
      </div>

      <div className="admindash__container p-4 mt-5 mb-4 text-center">
        <h5>Enquiries &amp; messages</h5>
        <Link to="/enquiries">
          <Button variant="outline-primary" className="mt-3">
            Booking enquiries
          </Button>
        </Link>
        <Link to="/messages">
          <Button variant="outline-primary" className="mt-3">
            Messages
          </Button>
        </Link>
      </div>
    </>
  );
}

export default AdminDashboard;
