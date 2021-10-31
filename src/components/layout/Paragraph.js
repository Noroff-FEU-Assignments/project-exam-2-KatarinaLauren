import PropTypes from "prop-types";

function Paragraph(props) {
  const paragrahStyle = {
    color: props.color,
    fontSize: props.fontSize,
    backgroundColor: props.bgColor,
  };
  return (
    <p style={paragrahStyle} className={props.className}>
      {props.children}
    </p>
  );
}
Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
};

export default Paragraph;
