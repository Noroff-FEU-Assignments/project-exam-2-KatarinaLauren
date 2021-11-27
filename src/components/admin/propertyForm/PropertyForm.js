import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormError from "../../layout/FormError";
import Paragraph from "../../layout/Paragraph";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";
import { facilitiesKey } from "../../../constants/keys";
import { propertySchema } from "../../../utilities/yup/YupSchemas";

const facilities = getFromStorage(facilitiesKey);

function PropertyForm(props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(propertySchema),
  });

  // FETCH UPDATED DATA AND SET TO LOCAL STORAGE //

  useEffect(() => {
    if (props.reset) {
      reset(props.reset);
    }
  }, [props.reset, reset]);

  // GET FACILITY NAMES //

  return (
    <>
      <Form className="property__form p-5 pt-2   m-auto mb-5 mt-5" onSubmit={handleSubmit(props.onSubmit)}>
        <Paragraph className="fst-italic text-center mb-4 pt-3" color="#a6adb4">
          All fields are required*
        </Paragraph>
        <fieldset disabled={props.disabled}>
          <Form.Group className="d-none" controlId="ControlInput1">
            <Form.Label>Id</Form.Label>
            <Form.Control {...register("id")} disabled />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ControlInput1">
            <Form.Label>Accommodation name</Form.Label>
            <Form.Control {...register("name")} />
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-2" controlId="ControlInput1">
            <Form.Label>Location</Form.Label>
            <Form.Text className="d-block mt-0" muted>
              Can be for example: City center, harbour, Fløien etc.
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

          <Form.Group className="m-auto mb-3" controlId="controlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Select category" {...register("category")} className="m-auto">
              <option>Select one option</option>
              <option value="Hotel">Hotel</option>
              <option value="BB">B&amp;B</option>
              <option value="Guesthouse">Guesthouse</option>
            </Form.Select>
            {errors.category && <FormError>{errors.category.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Text className="d-block mt-0" muted>
              A general description of the property with facilities and room types. Remember to include USPs (Unique Selling Points) and keep the text fun and interesting! For proper formatting -
              write in <span className="fw-bold">MarkDown</span>.
            </Form.Text>
            <Form.Control as="textarea" rows={10} {...register("description")} />
            {errors.description && <FormError>{errors.description.message}</FormError>}
          </Form.Group>

          <Form.Group className="mb-3 d-flex flex-wrap justify-content-between justify-content-md-start" controlId="formBasicCheckbox">
            <Form.Label>Facilities</Form.Label>
            <Form.Text className="d-block mt-0" muted>
              Check the facilities that are available at your accommodation. Leave the other ones empty.
            </Form.Text>
            {facilities.map(function (name) {
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

          <div className="text-center text-md-end">{props.children}</div>
        </fieldset>
      </Form>
    </>
  );
}

export default PropertyForm;
