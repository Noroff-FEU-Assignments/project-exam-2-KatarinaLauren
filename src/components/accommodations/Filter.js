import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Paragraph from "../layout/Paragraph";

function Filters(props) {
  let data = props.filterValues;

  return (
    <div>
      <Accordion className={"filters__accordion"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <Paragraph fontWeight={"bold"}>Facilities </Paragraph>
            <Form>
              <Form.Group className="mb-3 filter__facilities" controlId="formBasicCheckbox">
                {data.map(function (name) {
                  return <Form.Check type="checkbox" name={name} label={name.charAt(0).toUpperCase() + name.slice(1)} onChange={props.changeFunction} />;
                })}
              </Form.Group>
              <Button variant="outline-secondary" type="reset">
                Clear all
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Filters;
