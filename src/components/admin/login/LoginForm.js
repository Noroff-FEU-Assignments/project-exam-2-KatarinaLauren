import { AuthUrl } from "../../../constants/api";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../../layout/messages/FormError";
import AuthContext from "../../../context/AuthContext";

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

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setLoading(true);
    setError(null);

    // console.log(data);

    try {
      const response = await axios.post(AuthUrl, data);

      // console.log("response", response.data);
      setAuth(response.data);
    } catch (error) {
      // console.log("error", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="login__form d-flex flex-column align-items-center mt-4 pt-5 pb-5 mb-5">
        {error && (
          <FormError>
            <p>Unable to login. Please check your credentials</p>
          </FormError>
        )}
        <fieldset disabled={loading}>
          <Form.Group className="mb-3">
            <Form.Label>Username/Email</Form.Label>
            <Form.Control {...register("identifier")} name="identifier" type="text" />
            {errors.identifier && <FormError>{errors.identifier.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control {...register("password")} name="password" type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
          </Form.Group>
          <div className="text-end">
            <Button variant="success" type="submit" className="mt-4 pe-5 ps-5">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}
