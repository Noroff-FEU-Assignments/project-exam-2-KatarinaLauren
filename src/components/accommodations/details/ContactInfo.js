import Paragraph from "../../layout/Paragraph";

function ContactInfo(props) {
  return (
    <div className="ps-3">
      <Paragraph color={"#02a6b5"} fontWeight={"bold"}>
        Contact information
      </Paragraph>
      <div className="ps-3">
        <Paragraph>
          <i className="fas fa-map-marker-alt"></i>
          {props.address}
        </Paragraph>

        <Paragraph>
          <i className="fas fa-phone"></i>
          {props.phone}
        </Paragraph>

        <Paragraph>
          <i className="fas fa-envelope"></i>
          {props.email}
        </Paragraph>
      </div>
    </div>
  );
}

export default ContactInfo;
