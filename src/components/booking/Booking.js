import React from "react";
import PageHeading from "../layout/PageHeading";
import BookingForm from "./BookingForm";
import Container from "react-bootstrap/Container";
import Hero from "../layout/Hero";
import heroImage from "../../images/booking/booking_hero.jpg";

function Booking() {
  return (
    <div className="booking__container">
      <Hero image={heroImage}>
        <PageHeading color={"#fff"}>BOOKING ENQUIRIES</PageHeading>
      </Hero>
      <Container className="booking__form__container mt-4 mb-5">
        <h5 className="text-center booking__form__heading">Booking enquiry</h5>
        <BookingForm />
      </Container>
    </div>
  );
}

export default Booking;
