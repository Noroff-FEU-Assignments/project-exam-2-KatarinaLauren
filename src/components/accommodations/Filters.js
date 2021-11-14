import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Paragraph from "../layout/Paragraph";

function Filters(props) {
  let data = props.filterValues;

  return (
    <div>
      {/* SMALL SCREENS  */}
      <Accordion className={"filters__container"}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className={"d-lg-none"}>Filters</Accordion.Header>
          <Accordion.Body>
            <h5 className={"d-none d-lg-block mb-4"}>Filters</h5>
            <Paragraph>Find your perfect match by choosing what is important to you! </Paragraph>
            <Paragraph fontWeight={"bold"}>Facilities </Paragraph>
            <Form onReset={props.changeFunction}>
              {data.map(function (name) {
                return <Form.Check type="checkbox" id={name} name={name} label={name.charAt(0).toUpperCase() + name.slice(1)} onChange={props.changeFunction} />;
              })}
              <div className={"d-flex justify-content-center justify-content-lg-end mb-3"}>
                <Button variant="outline-info" className="mt-4" onClick={props.resetFunction}>
                  Clear all
                </Button>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Filters;
