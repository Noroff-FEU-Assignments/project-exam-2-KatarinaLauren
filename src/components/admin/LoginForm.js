import { BaseUrl } from "../../constants/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../layout/FormError";

const url = BaseUrl;
const authUrl = url + "/auth/local";
const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setLoading(true);
    setError(null);

    console.log(data);

    try {
      const response = await axios.post(authUrl, data);

      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error && <FormError>{error}</FormError>}
        <fieldset disabled={loading}>
          <Form.Group className="mb-2" controlId="ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control {...register("identifier")} name="identifier" type="text" />
            {errors.identifier && <FormError>{errors.identifier.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>password</Form.Label>
            <Form.Control {...register("password")} name="password" type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </Form.Group>

          <Button variant="success" type="submit">
            {loading ? "Loggin in..." : "Login"}
          </Button>
        </fieldset>
      </Form>
    </>
  );
}
