import Paragraph from "../../layout/Paragraph";

function Info(props) {
  return (
    <div className={"mt-3 details__container__info text-center"}>
      <Paragraph>
        <span className={"details__paragraph__label"}>Category: </span>
        {props.category}
      </Paragraph>
      <Paragraph>
        <span className={"details__paragraph__label"}>Location: </span>
        {props.location}
      </Paragraph>
      <Paragraph>
        <span className={"details__paragraph__label"}>Room rate from: </span>
        {props.room_rate} NOK
      </Paragraph>
    </div>
  );
}

export default Info;
