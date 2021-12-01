import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function AccommodationItem({ id, name, location, rate, image }) {
  return (
    <Link to={`detail/${id}`}>
      <Card className="flex-column flex-md-row align-items-center align-items-md-start accommodation__card m-auto mt-4">
        <Card.Img variant="top" src={image} />
        <Card.Body className="text-center text-md-start position-relative w-100 pb-4 mb-0 pt-md-0 mt-md-0 ps-md-3 ms-lg-2">
          <Card.Text className={"card__text--rate fs-3 fst-normal p-2 mb-0"}>
            <span className="fst-italic fs-6">from </span>
            {rate},-
          </Card.Text>
          <Card.Title className="pt-3 pt-md-5 mt-md-3">{name}</Card.Title>
          <Card.Text className={"card__text--location pb-4"}>
            <i className="fas fa-map-marker-alt"></i> {location}
          </Card.Text>

          <Button variant="success" className={"d-none d-md-block m-auto mt-4 mt-md-1 ps-5 pe-5"}>
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
