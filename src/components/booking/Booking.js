import React from "react";
import PageHeading from "../layout/PageHeading";
import BookingForm from "./BookingForm";

function Booking() {
  return (
    <div>
      <PageHeading className={"text-center mt-5"}>BOOKING ENQUIRIES</PageHeading>
      <BookingForm />
    </div>
  );
}

export default Booking;
