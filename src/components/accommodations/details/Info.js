import Paragraph from "../../layout/Paragraph";

function Info(props) {
  let category;
  if (props.category === "BB") {
    category = "B&B";
  } else {
    category = props.category;
  }

  return (
    <div className={"mt-3 mt-md-4 pt-md-4 details__container__info d-flex flex-column flex-md-row align-items-center justify-content-evenly"}>
      <Paragraph>
        <span className={"details__paragraph__label"}>Category: </span>
        {category}
      </Paragraph>
      <Paragraph>
        <span className={"details__paragraph__label"}>
          <i className="fas fa-map-marker-alt"></i>{" "}
        </span>
        {props.location}
      </Paragraph>
      <Paragraph>
        <span className={"details__paragraph__label"}>From: </span>
        <span className="fw-bolder">{props.room_rate} NOK</span>
      </Paragraph>
    </div>
  );
}

export default Info;
