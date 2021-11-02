import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { GetData } from "../../utilities/GetData";
import { BaseUrl } from "../../constants/api";

const url = BaseUrl;

function InspirationCards() {
  const { data, error, isLoaded } = GetData(url + "/inspirations");
  console.log(data);

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
    <Container className="d-flex flex-row flex-wrap justify-content-evenly cardgroup">
      {data.map((item) => (
        <Link to="/inspiration" key={item.id}>
          <Card className="m-0 mt-3 m-md-3">
            <Card.Img variant="top" src={url + item.image.url} />
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
