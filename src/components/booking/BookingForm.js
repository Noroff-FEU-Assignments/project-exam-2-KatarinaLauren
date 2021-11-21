import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../layout/FormError";
import Paragraph from "../layout/Paragraph";
import SuccessMessage from "./SuccessMessage";
import { getFromStorage } from "../../utilities/localStorage/localStorageFunctions";
import { BaseUrl } from "../../constants/api";
import axios from "axios";
import ErrorMessage from "../layout/ErrorMessage";
import { accommodationKey } from "../../constants/keys";

const url = BaseUrl;
const enquiryUrl = url + "/enquiries";
const items = getFromStorage(accommodationKey);

const date = new Date();
const tomorrow = new Date(date);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowsDate = tomorrow.toISOString().substring(0, 10);
const dayAfterTomorrow = new Date(tomorrow);
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrowsDate = dayAfterTomorrow.toISOString().substring(0, 10);

const schema = yup.object().shape({
  accommodation: yup.string().required(),
  checkin_date: yup.date().nullable().required().min(date),
  checkout_date: yup.date().nullable().required().min(tomorrow),
  number_of_guests: yup.number(),
  customer_name: yup.string().min(4, "Must be minimum 4 characters long").required("Please enter your name"),
  email: yup.string().email("Please enter a valid email address").required("Please enter an email address"),
  phone_number: yup.number().required(),
  message: yup.string(),
});

function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  function postData(data, url) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }

  function onSubmit(values) {
    setData(values);
    postData(values, enquiryUrl);
  }

  function resetData() {
    setData(null);
    setError(null);
    reset();
  }

  const accommodationOptions = items.map(function (item) {
    return (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    );
  });

  if (error !== null) {
    return <ErrorMessage />;
  }

  if (data && error === null) {
    return (
      <div className={"booking__message d-flex flex-column justify-content-center mb-md-5 mt-md-4"}>
        <SuccessMessage />
        <Button variant="success" onClick={resetData} className="booking__message__button m-auto mb-4">
          Make a new enquiry
        </Button>
      </div>
    );
  } else {
    return (
      <div className={"booking__form"}>
        <Paragraph className={"fst-italic"}>The booking department of your chosen accommodation will answer your enquiry within 24 hours.</Paragraph>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-2" controlId="controlInput1">
            <Form.Label>Accommodation</Form.Label>
            <Form.Select aria-label="Select accommodation" {...register("accommodation")}>
              <option value={""}>Select accommodation</option>
              {accommodationOptions}
              {errors.accommodation && <FormError>{"Please select your accommodation"}</FormError>}
            </Form.Select>
          </Form.Group>
          <div className=" d-flex flex-column flex-md-row mb-3 justify-content-evenly">
            <Form.Group className="booking__form__dates" controlId="controlInput1">
              <Form.Label>Check-in date</Form.Label>
              <Form.Control type="date" name="checkin" error={errors.checkin} {...register("checkin_date")} defaultValue={tomorrowsDate} />
              {errors.checkin && <FormError>{"Check-in date is required and must be a future date"}</FormError>}
            </Form.Group>

            <Form.Group className="booking__form__dates" controlId="controlInput1">
              <Form.Label>Check-out date</Form.Label>
              <Form.Control type="date" name="checkout" error={errors.checkin} {...register("checkout_date")} defaultValue={dayAfterTomorrowsDate} />
              {errors.checkout && <FormError>{"Check-in date is required and must be a future date"}</FormError>}
            </Form.Group>
          </div>

          <Form.Group className="booking__form__select m-auto mb-2 text-center" controlId="controlInput1">
            <Form.Label>Number of guests</Form.Label>
            <Form.Select aria-label="Select number of guests" {...register("number_of_guests")} className="m-auto">
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
            <Form.Control {...register("customer_name")} name="customer_name" type="text" />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email*</Form.Label>
            <Form.Control {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Phone Number*</Form.Label>
            <Form.Control {...register("phone_number")} />
            {errors.phone && <FormError>{"Please enter a valid phone number"}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Message &amp; Special requests</Form.Label>
            <Form.Control as="textarea" rows={5} {...register("message")} />
            {errors.message && <FormError>{errors.message.message}</FormError>}
          </Form.Group>

          <Button variant="primary" type="submit" className="m-3 ms-auto pe-5 ps-5">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default BookingForm;
