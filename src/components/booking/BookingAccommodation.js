import React from "react";

function BookingAccommodation(props) {
  const accommodation = props.data;

  if (accommodation) {
    return <div>Yes we have data</div>;
  } else {
    return <div>No we don't have data</div>;
  }
}

export default BookingAccommodation;
