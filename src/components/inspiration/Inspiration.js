import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import ErrorLoadingMessage from "../layout/messages/ErrorLoadingMessage";
import ErrorMessage from "../layout/messages/ErrorMessage";
import { GetData } from "../../utilities/GetData";
import { InspirationUrl } from "../../constants/api";
import PageHeading from "../layout/PageHeading";

function Inspiration() {
  const { data, error, loading } = GetData(InspirationUrl);

  return (
    <>
      <PageHeading color={"#02a6b5"} className={"mt-5 text-center"}>
        INSPIRATION
      </PageHeading>
      <ErrorLoadingMessage loading={loading} />
      {error && <ErrorMessage>An error occurred</ErrorMessage>}
      {data && (
        <Container className="d-flex flex-wrap cardgroup">
          {data.map((item) => (
            <Card key={item.id} className="m-auto mt-5 mb-5 cardgroup__card--wide align-self-start">
              <Card.Img variant="top" src={item.image.url} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{item.overview}</Accordion.Header>
                    <Accordion.Body dangerouslySetInnerHTML={{ __html: `${item.section_1}` }}></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
}

export default Inspiration;
