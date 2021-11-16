import Paragraph from "../../layout/Paragraph";
import Accordion from "react-bootstrap/Accordion";

function Description(props) {
  return (
    <Accordion className={"mt-3 mt-lg-0 details__container__description"}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={"d-md-none"}>Description</Accordion.Header>
        <Accordion.Body>
          <Paragraph color={"#02a6b5"} fontWeight={"bold"} className={"d-none d-md-block"}>
            Description
          </Paragraph>
          <p className={"ps-2 pe-2"}>{props.description}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Description;
