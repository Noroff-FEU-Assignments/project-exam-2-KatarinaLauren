import Paragraph from "../../layout/Paragraph";

function ContactInfo(props) {
  return (
    <div>
      <Paragraph color={"#02a6b5"} fontWeight={"bold"}>
        Contact information
      </Paragraph>

      <Paragraph>
        <i class="fas fa-map-marker-alt"></i>
        {props.address}
      </Paragraph>

      <Paragraph>
        <i class="fas fa-phone"></i>
        {props.phone}
      </Paragraph>

      <Paragraph>
        <i class="fas fa-envelope"></i>
        {props.email}
      </Paragraph>
    </div>
  );
}

export default ContactInfo;
