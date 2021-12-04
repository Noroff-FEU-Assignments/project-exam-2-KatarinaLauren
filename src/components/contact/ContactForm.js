import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormError from "../layout/messages/FormError";
import ContactMessage from "./ContactMessage";
import { Link } from "react-router-dom";
import { MessageUrl } from "../../constants/api";
import axios from "axios";
import ErrorLoadingMessage from "../layout/messages/ErrorLoadingMessage";
import { contactSchema } from "../../utilities/yup/YupSchemas";
import ContactError from "./ContactError";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (data) {
      async function postData() {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        await axios
          .post(MessageUrl, formData)
          .then(() => {
            setMessage(<ContactMessage />);
            reset();
          })
          .catch((error) => {
            console.log(error);
            setError(<ContactError />);
          })
          .finally(() => {
            setLoading(false);
            window.scrollTo(0, 0);
          });
      }
      postData();
    }
  }, [data, reset]);

  function onSubmit(values) {
    setData(values);
    setError(null);
    setMessage(null);
    setLoading(true);
  }

  return (
    <Container className="contact__form mb-5 p-3 pt-1 mt-5">
      <Alert variant="white" className="contact__form__alert">
        <h5>We at Holidaze would love to hear from you!</h5>
        <div className="text-start mt-3">
          <p>Please use the form below to get in touch with us. We will get back to you as soon as possible after we recieve your message.</p>
          <p>
            For booking enquiries - kindly use the form found on <Link to="/booking">the bookings page</Link>
          </p>
        </div>
      </Alert>
      <ErrorLoadingMessage error={error} message={message} loading={loading} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Full name*</Form.Label>
          <Form.Control {...register("name")} name="name" type="text" />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email*</Form.Label>
          <Form.Control {...register("email")} />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number*</Form.Label>
          <Form.Control {...register("phone")} />
          {errors.phone && <FormError>{"Please enter a valid phone number"}</FormError>}
        </Form.Group>

        <Form.Group className="mb-3">
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

export default ContactForm;
