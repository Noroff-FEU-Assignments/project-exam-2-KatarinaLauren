import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function AccommodationItem({ id, name, location, rate, image }) {
  return (
    <Link to={`detail/${id}`} className={"d"}>
      <Card className="flex-column flex-md-row accommodation__card">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className={"card__text--location"}>Location: {location}</Card.Text>
          <Card.Text className={"card__text--rate"}>Room rate from: {rate} NOK</Card.Text>
          <Button variant="success" className={"d-block m-auto mt-4 ps-5 pe-5"}>
            Read more
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
}

AccommodationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default AccommodationItem;
