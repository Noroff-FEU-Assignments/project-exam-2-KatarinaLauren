import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { GetData } from "../../utilities/GetData";
import { InspirationUrl } from "../../constants/api";
import ErrorMessage from "../layout/ErrorMessage";

function InspirationCards() {
  const { data, error, isLoaded } = GetData(InspirationUrl);

  if (error !== null) {
    return (
      <ErrorMessage>
        <p>An error occurred.</p>
      </ErrorMessage>
    );
  }
  if (!isLoaded) {
    return (
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
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
  );
}

export default InspirationCards;
