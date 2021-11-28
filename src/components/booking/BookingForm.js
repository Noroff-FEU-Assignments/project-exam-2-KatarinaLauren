import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../layout/FormError";
import BookingMessage from "./BookingMessage";
import BookingError from "./BookingError";
import { BookingUrl, AccUrl } from "../../constants/api";
import axios from "axios";
import FormMessages from "../layout/FormMessages";
import { bookingEnquirySchema } from "../../utilities/yup/YupSchemas";

const date = new Date();
const tomorrow = new Date(date);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowsDate = tomorrow.toISOString().substring(0, 10);
const dayAfterTomorrow = new Date(tomorrow);
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrowsDate = dayAfterTomorrow.toISOString().substring(0, 10);

function BookingForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingEnquirySchema),
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (data) {
      async function postData() {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        await axios
          .post(BookingUrl, formData)
          .then(() => {
            setMessage(<BookingMessage />);
            reset();
          })
          .catch((error) => {
            console.log(error);
            setError(<BookingError />);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      postData();
    }
  }, [data, reset]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(AccUrl)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const accommodationOptions = items.map(function (item) {
    return (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    );
  });

  function onSubmit(values) {
    setData(values);
    setError(null);
    setMessage(null);
    setLoading(true);
  }

  return (
    <div className={"booking__form"}>
      <FormMessages error={error} message={message} loading={loading} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2" controlId="controlInput1">
          <Form.Label>Accommodation</Form.Label>
          <Form.Select aria-label="Select accommodation" name="accommodation" {...register("accommodation")}>
            <option value="select">Select accommodation</option>
            {accommodationOptions}
          </Form.Select>
          {errors.accommodation && <FormError>{"Please select your accommodation"}</FormError>}
        </Form.Group>
        <div className=" d-flex flex-column flex-md-row mb-3 justify-content-evenly">
          <Form.Group className="booking__form__dates" controlId="controlInput1">
            <Form.Label>Check-in date</Form.Label>
            <Form.Control type="date" name="checkin" error={errors.checkin} {...register("checkin_date")} defaultValue={tomorrowsDate} />
            {errors.checkin_date && <FormError>{"Check-in date is required and must be a future date"}</FormError>}
          </Form.Group>

          <Form.Group className="booking__form__dates" controlId="controlInput1">
            <Form.Label>Check-out date</Form.Label>
            <Form.Control type="date" name="checkout" error={errors.checkin} {...register("checkout_date")} defaultValue={dayAfterTomorrowsDate} />
            {errors.checkout_date && <FormError>{"Check-in date is required and must be a future date"}</FormError>}
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
          {errors.customer_name && <FormError>{errors.customer_name.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Label>Email*</Form.Label>
          <Form.Control {...register("email")} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Label>Phone Number*</Form.Label>
          <Form.Control {...register("phone_number")} />
          {errors.phone_number && <FormError>{"Please enter a valid phone number"}</FormError>}
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

export default BookingForm;
