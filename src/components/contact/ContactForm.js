import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormError from "../../utilities/FormError";
import ContactMessage from "./ContactMessage";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../constants/api";
import { postData } from "../../utilities/PostData";

const url = BaseUrl;
const messagesUrl = url + "/messages";

const schema = yup.object().shape({
  name: yup.string().min(4, "Must be minimum 4 characters long").required("Please enter your name"),
  email: yup.string().email("Please enter a valid email address").required("Please enter an email address"),
  phone: yup.number().required(),
  message: yup.string(),
});

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState(null);

  function onSubmit(values) {
    setData(values);
    postData(values, messagesUrl);
  }

  function resetData() {
    setData(null);
    reset();
  }

  if (data) {
    return (
      <Container className="contact__form mb-5 mt-5">
        <div className={"booking__message d-flex flex-column justify-content-center mb-md-5 mt-md-4"}>
          <ContactMessage>
            <h5>Thank you for your message!</h5>
            <div className="text-start mt-3">
              <p>We will get back to you as soon as possible.</p>
              <p>
                In the mean time - go to our <Link to="/inspiration">inspiration page</Link> to read more about things to do when in Bergen.
              </p>
            </div>
          </ContactMessage>
          <Button variant="outline-secondary" onClick={resetData} className="m-auto mb-4">
            Close
          </Button>
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="contact__form mb-5 p-3 pt-1 mt-5">
        <ContactMessage>
          <h5>We at Holidaze would love to hear from you!</h5>
          <div className="text-start mt-3">
            <p>Please use the form below to get in touch with us. We will get back to you as soon as possible after we recieve your message.</p>
            <p>
              For booking enquiries - kindly use the form found on <Link to="/booking">the bookings page</Link>
            </p>
          </div>
        </ContactMessage>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} {...register("message")} />
            {errors.message && <FormError>{errors.message.message}</FormError>}
          </Form.Group>

          <Button variant="primary" type="submit" className="m-3 ms-auto ps-5 pe-5">
            Send
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ContactForm;
