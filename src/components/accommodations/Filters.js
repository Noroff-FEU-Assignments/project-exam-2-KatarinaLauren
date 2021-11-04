import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";

function Filters() {
  return (
    <div>
      <Accordion className={"filters__accordion"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Hotels" />
              <Form.Check type="checkbox" label="B&amp;Bs" />
              <Form.Check type="checkbox" label="Guesthouses" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Breakfast" />
              <Form.Check type="checkbox" label="Parking" />
              <Form.Check type="checkbox" label="Restaurant" />
              <Form.Check type="checkbox" label="Bar" />
              <Form.Check type="checkbox" label="Pool" />
              <Form.Check type="checkbox" label="Gym" />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Filters;
