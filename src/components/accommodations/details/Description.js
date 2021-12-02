import Paragraph from "../../layout/Paragraph";
import Accordion from "react-bootstrap/Accordion";
import ReactMarkdown from "react-markdown";

function Description(props) {
  return (
    <div className={"mt-3 mt-lg-0 details__container__description ms-lg-3 me-0"}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header className={"d-md-none"}>Description</Accordion.Header>
          <Accordion.Body>
            <Paragraph color={"#02a6b5"} fontWeight={"bold"} className={"d-none d-md-block"}>
              Description
            </Paragraph>
            <div className={"ps-2 pe-2"}>
              <ReactMarkdown>{props.description}</ReactMarkdown>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Description;
