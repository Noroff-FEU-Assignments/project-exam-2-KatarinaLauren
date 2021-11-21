import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormError from "../../layout/FormError";
import Paragraph from "../../layout/Paragraph";
import axios from "axios";
import { BaseUrl } from "../../../constants/api";
import { Link } from "react-router-dom";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { accommodationKey, authKey } from "../../../constants/keys";

const url = BaseUrl;
const accUrl = url + "/accommodations";

const authData = getFromStorage(authKey);
const authJWT = authData.jwt;

const schema = yup.object().shape({
  name: yup.string().required("Please enter the name of the property"),
  description: yup.string().min(20, "Must be minimum 20 characters long").required(),
  room_rate: yup.number().required("Please enter the minimum room rate"),
  phone: yup.number().required("Please enter the phone number of the property"),
  address: yup.string().required("Please enter the visiting address of the property"),
  latitude: yup.number().required("Please enter latitude"),
  longitude: yup.number().required("Please enter longitude"),
  location: yup.string().required("Please enter the general location of the property"),
  category: yup.mixed().oneOf(["Hotel", "BB", "Guesthouse"]),
  email: yup.string().email("Please enter a valid email address").required("Please enter the email address of the property"),
  facilities: yup.object().required(),
});

function PropertyForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    setError(null);
    setMessage(false);

    // console.log(data);

    try {
      const response = await axios.post(accUrl, data, {
        headers: {
          Authorization: "Bearer " + authJWT,
        },
      });

      console.log("response", response.data);
      setMessage(true);
      reset();
    } catch (error) {
      console.log("error", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const accommodations = getFromStorage(accommodationKey);
  const facilities = accommodations[0].facilities;
  const facilityNames = Object.keys(facilities);
  facilityNames.shift();

  return (
    <>
      <Form className="property__form p-5 m-auto mb-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Paragraph className="fst-italic text-center mb-4" color="#a6adb4">
          All fields are required*
        </Paragraph>
        {message && <p>Property added</p>}
        {error && (
          <FormError>
            <p>
              Something went wrong. Please try again or <Link to="/contact">contact us</Link>
            </p>
          </FormError>
        )}
        <fieldset disabled={loading}>
          <Form.Group className="mb-3" controlId="ControlInput1">
            <Form.Label>Accommodation name</Form.Label>
            <Form.Control {...register("name")} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="ControlInput1">
            <Form.Label>Location</Form.Label>
            <Form.Text className="d-block mt-0" muted>
              Can be for example "City center", harbour, Fløien etc.
            </Form.Text>
            <Form.Control {...register("location")} />
            {errors.location && <FormError>{errors.location.message}</FormError>}
          </Form.Group>

          <div className=" d-flex flex-column flex-md-row mb-3 justify-content-evenly">
            <Form.Group className="" controlId="controlInput1">
              <Form.Label>Latitude</Form.Label>
              <Form.Control {...register("latitude")} />
              {errors.latitude && <FormError>{errors.latitude.message}</FormError>}
            </Form.Group>

            <Form.Group className="" controlId="controlInput1">
              <Form.Label>Longitude</Form.Label>
              <Form.Control {...register("longitude")} />
              {errors.longitude && <FormError>{errors.longitude.message}</FormError>}
            </Form.Group>
          </div>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows={3} {...register("address")} />
            {errors.address && <FormError>{errors.address.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control {...register("phone")} />
            {errors.phone && <FormError>{errors.phone.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control {...register("email")} />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="controlInput1">
            <Form.Label>Room rate (NOK)</Form.Label>
            <Form.Control {...register("room_rate")} />
            {errors.room_rate && <FormError>{errors.room_rate.message}</FormError>}
          </Form.Group>

          <Form.Group className="m-auto mb-3 text-center" controlId="controlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Select category" {...register("category")} className="m-auto">
              <option>Select one option</option>
              <option value="Hotel">Hotel</option>
              <option value="BB">B&amp;B</option>
              <option value="Guesthouse">Guesthouse</option>
              {errors.category && <FormError>{errors.category.message}</FormError>}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Text className="d-block mt-0" muted>
              A general description of the property with facilities and room types. Remember to include USPs (Unique Selling Points) and keep the text fun and interesting!
            </Form.Text>
            <Form.Control as="textarea" rows={10} {...register("description")} />
            {errors.description && <FormError>{errors.description.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-wrap justify-content-between justify-content-md-start" controlId="formBasicCheckbox">
            <Form.Label>Facilities</Form.Label>
            <Form.Text className="d-block mt-0" muted>
              Check the facilities that are available at your accommodation. Leave the other ones empty.
            </Form.Text>
            {facilityNames.map(function (name) {
              return (
                <Controller
                  key={name}
                  control={control}
                  name={`facilities.${name}`}
                  render={({ field: { value, onChange } }) => (
                    <Form.Check
                      {...register(`facilities.${name}`)}
                      type="checkbox"
                      id={name}
                      name={name}
                      label={name}
                      checked={value}
                      onChange={(e) => {
                        onChange(e.target.checked);
                      }}
                    />
                  )}
                />
              );
            })}
          </Form.Group>

          <div className="text-center">
            <Button variant="success" type="submit" className="mt-4 pe-5 ps-5">
              {loading ? "Uploading" : "Add property"}
            </Button>
          </div>
        </fieldset>
      </Form>
    </>
  );
}

export default PropertyForm;
