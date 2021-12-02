import AccommodationItem from "./AccommodationItem";

function AccommodationList(props) {
  return (
    <div className={"flex-grow-1"}>
      {props.items
        .filter((item) => props.filterBooking(item))
        .map(function (item) {
          const imageUrl = item.images[0].url;
          const { id, name, location, room_rate } = item;
          return <AccommodationItem key={id} id={id} name={name} location={location} rate={room_rate} image={imageUrl} />;
        })}
    </div>
  );
}

export default AccommodationList;
