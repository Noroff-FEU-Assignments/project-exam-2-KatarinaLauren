import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import { GetData } from "../../utilities/GetData";
import { BaseUrl } from "../../constants/api";
import PageHeading from "../layout/PageHeading";
const url = BaseUrl;

function Inspiration() {
  const { data, error, isLoaded } = GetData(url + "/inspirations");
  // console.log(data);

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return (
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      <PageHeading color={"#02a6b5"} className={"mt-5 text-center"}>
        INSPIRATION
      </PageHeading>
      <Container className="d-flex flex-wrap cardgroup">
        {data.map((item) => (
          <Card key={item.id} className="m-auto mt-5 mb-5 cardgroup__card--wide align-self-start">
            <Card.Img variant="top" src={url + item.image.url} />
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
    </>
  );
}

export default Inspiration;

// dangerouslySetInnerHTML={{ __html: `${item.section_1}` }}
