import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { BaseUrl } from "../../constants/api";

function Details() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  useEffect(
    function () {
      const accommodations = getFromStorage();
      if (accommodations.length > 0) {
        const accDetails = accommodations.filter((acc) => acc.id === parseInt(id));
        setData(accDetails[0]);
      } else {
        setError("An error occured");
      }
      setLoading(false);
    },
    [id]
  );

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  const images = data.images;

  return (
    <Container>
      <Carousel>
        {images.map(function (image) {
          return (
            <Carousel.Item>
              <img className="d-block w-100" src={BaseUrl + image.url} alt={image.alternativeText} />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </Container>
  );
}

export default Details;
