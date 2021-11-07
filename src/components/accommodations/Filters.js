import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Paragraph from "../layout/Paragraph";
import { handleChange } from "../../utilities/filterFunctions";
// import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";

function Filters() {
  return (
    <div>
      <Accordion className={"filters__accordion"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <Paragraph fontWeight={"bold"}>Category </Paragraph>
            <Form.Group className="mb-3 filter__category" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" name="Hotel" label="Hotels" />
              <Form.Check type="checkbox" name="BB" label="B&amp;Bs" />
              <Form.Check type="checkbox" name="Guesthouse" label="Guesthouses" />
            </Form.Group>
            <Paragraph fontWeight={"bold"}>Facilities </Paragraph>
            <Form.Group className="mb-3 filter__facilities" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" name="breakfast" label="Breakfast" onChange={handleChange} />
              <Form.Check type="checkbox" name="parking" label="Parking" onChange={handleChange} />
              <Form.Check type="checkbox" name="restaurant" label="Restaurant" onChange={handleChange} />
              <Form.Check type="checkbox" name="bar" label="Bar" onChange={handleChange} />
              <Form.Check type="checkbox" name="pool" label="Pool" onChange={handleChange} />
              <Form.Check type="checkbox" name="gym" label="Gym" onChange={handleChange} />
              <Form.Check type="checkbox" name="seaview" label="Seaview" onChange={handleChange} />
              <Form.Check type="checkbox" name="receptipn" label="Reception" onChange={handleChange} />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Filters;
