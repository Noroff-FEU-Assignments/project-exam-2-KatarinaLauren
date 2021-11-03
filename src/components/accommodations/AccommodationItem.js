import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AccommodationItem({ id, name }) {
  return (
    <Link to={`detail/${id}`}>
      <h5>{name}</h5>
      <p>{id}</p>
    </Link>
  );
}

AccommodationItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default AccommodationItem;
