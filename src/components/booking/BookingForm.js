import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "./FormError";
import Paragraph from "../layout/Paragraph";
import SuccessMessage from "./SuccessMessage";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";

const items = getFromStorage();

const date = new Date();
const tomorrow = new Date(date);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowsDate = tomorrow.toISOString().substring(0, 10);
const dayAfterTomorrow = new Date(tomorrow);
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrowsDate = dayAfterTomorrow.toISOString().substring(0, 10);

const schema = yup.object().shape({
  accommodation: yup.string(),
  checkin: yup.date().nullable().required().min(date),
  checkout: yup.date().nullable().required().min(tomorrow),
  noOfGuest: yup.number(),
  name: yup.string().min(4, "Must be minimum 4 characters long").required("Please enter your name"),
  email: yup.string().email("Please enter a valid email address").required("Please enter an email address"),
  phone: yup.number().required(),
  message: yup.string(),
});

function BookingForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState(null);
  const [accommodationInput, setaccommodationInput] = useState("");

  if (props.accName) {
    setaccommodationInput(<Form.Control {...register("accommodation")} value={props.accName} readOnly />);
  }
  if (!props.accName) {
    setaccommodationInput(
      <Form.Select aria-label="Select accommodation" {...register("accommodation")}>
        {items.map(function (item) {
          console.log(
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </Form.Select>
    );
  }

  function onSubmit(values) {
    setData(values);
    console.log(values);
  }

  // console.log(errors);
  if (data) {
    return <SuccessMessage />;
  } else {
    return (
      <>
        <Paragraph className={"fst-italic"}>The booking department of your chosen accommodation will answer your enquiry within 24 hours.</Paragraph>
        <Form onSubmit={handleSubmit(onSubmit)} className={"booking__form"}>
          <Form.Group className="mb-2" controlId="controlInput1">
            <Form.Label>Accommodation</Form.Label>
            {accommodationInput}
          </Form.Group>

          <Form.Group className="m-auto mb-3 booking__form__dates d-block d-md-inline-block ms-md-3" controlId="controlInput1">
            <Form.Label>Check-in date</Form.Label>
            <Form.Control type="date" name="checkin" error={errors.checkin} {...register("checkin")} defaultValue={tomorrowsDate} />
            {errors.checkin && <FormError>{"Check-in date is required and must be a future date"}</FormError>}
          </Form.Group>
          <Form.Group className="m-auto mb-3 booking__form__dates d-block d-md-inline-block ms-md-3" controlId="controlInput1">
            <Form.Label>Check-out date</Form.Label>
            <Form.Control type="date" name="checkout" error={errors.checkin} {...register("checkout")} defaultValue={dayAfterTomorrowsDate} />
            {errors.checkout && <FormError>{"Check-in date is required and must be a future date"}</FormError>}
          </Form.Group>

          <Form.Group className="booking__form__select m-auto mb-2 text-center" controlId="controlInput1">
            <Form.Label>Number of guests</Form.Label>
            <Form.Select aria-label="Select number of guests" {...register("noOfGuest")} className="m-auto">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2" controlId="ControlInput1">
            <Form.Label>Full name*</Form.Label>
            <Form.Control {...register("name")} name="name" type="text" />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email*</Form.Label>
            <Form.Control {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Phone Number*</Form.Label>
            <Form.Control {...register("phone")} />
            {errors.phone && <FormError>{"Please enter a valid phone number"}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Message &amp; Special requests</Form.Label>
            <Form.Control as="textarea" rows={5} {...register("message")} />
            {errors.message && <FormError>{errors.message.message}</FormError>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default BookingForm;
