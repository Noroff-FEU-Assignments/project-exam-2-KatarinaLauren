import PropTypes from "prop-types";

function Heading(props) {
  const headingStyle = {
    color: props.color,
    fontSize: props.fontSize,
  };
  return (
    <h1 style={headingStyle} className={props.className}>
      {props.children}
    </h1>
  );
}
Heading.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  className: PropTypes.string,
};

export default Heading;
