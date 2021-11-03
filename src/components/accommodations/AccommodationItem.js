import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function AccommodationItem({ id, name, location, rate, image }) {
  return (
    <Link to={`detail/${id}`}>
      <Card className="m-0 mt-3 m-md-3">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Room rate from: {rate}</Card.Text>
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
  image: PropTypes.isRequired,
};

export default AccommodationItem;
