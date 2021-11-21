import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getFromStorage } from "../../../utilities/localStorage/localStorageFunctions";

const schema = yup.object().shape({
  facilities: yup.object().required(),
});

function TestForm() {
  const { register, handleSubmit, getValues, control } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    const values = getValues();
    console.log(values);
  }

  const accommodations = getFromStorage();
  const facilities = accommodations[0].facilities;
  const facilityNames = Object.keys(facilities);
  facilityNames.shift();

  return (
    <div>
      <Form className="property__form p-5 m-auto mb-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 d-flex flex-wrap justify-content-between justify-content-md-start" controlId="formBasicCheckbox">
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

          {/* <Controller
            control={control}
            name="facilities.parking"
            render={({ field: { value, onChange } }) => (
              <Form.Check
                {...register("facilities.parking")}
                type="checkbox"
                id="parking"
                name="parking"
                label="parking"
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="facilities.pool"
            render={({ field: { value, onChange } }) => (
              <Form.Check
                {...register("facilities.pool")}
                type="checkbox"
                id="pool"
                name="pool"
                label="pool"
                checked={value}
                onChange={(e) => {
                  onChange(e.target.checked);
                }}
              />
            )}
          /> */}

          {/* <Form.Check {...register("facilities.seaview")} type="checkbox" id="seaview" name="seaview" label="seaview" />
          <Form.Check {...register("facilities.breakfast")} type="checkbox" id="breakfast" name="breakfast" label="breakfast" />
          <Form.Check {...register("facilities.pool")} type="checkbox" id="pool" name="pool" label="pool" />
          <Form.Check {...register("facilities.parking")} type="checkbox" id="parking" name="parking" label="parking" />
          <Form.Check {...register("facilities.reception")} type="checkbox" id="reception" name="reception" label="reception" /> */}
        </Form.Group>

        <div className="text-center">
          <Button variant="success" type="submit" className="mt-4 pe-5 ps-5">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TestForm;
