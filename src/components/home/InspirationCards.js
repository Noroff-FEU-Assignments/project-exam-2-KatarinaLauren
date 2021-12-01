import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { GetData } from "../../utilities/GetData";
import { BASE_URL } from "../../constants/api";
import ErrorLoadingMessage from "../layout/messages/ErrorLoadingMessage";
import ErrorMessage from "../layout/messages/ErrorMessage";

function InspirationCards() {
  const { data, error, loading } = GetData(BASE_URL + "/inspirations");

  return (
    <>
      <ErrorLoadingMessage loading={loading} />
      {error && <ErrorMessage>An error occurred</ErrorMessage>}
      {data && (
        <Container className="d-flex flex-row flex-wrap justify-content-evenly cardgroup">
          {data.map((item) => (
            <Link to="/inspiration" key={item.id}>
              <Card className="m-0 mt-3 m-md-3">
                <Card.Img variant="top" src={item.image.url} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="cardgroup__overview pt-2">{item.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </Container>
      )}
    </>
  );
}

export default InspirationCards;
