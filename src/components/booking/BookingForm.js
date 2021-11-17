import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ReactSelect from "react-select";

const schema = yup.object().shape({
  accommodation: yup.string(),
  checkin: yup.date().nullable().required("Check in date is required").min(new Date(), "Must be a future date"),
  checkout: yup.date().nullable().required("Check out date is required").min(new Date(), "Must be a future date"),
  noOfGuest: yup.number(),
  name: yup.string().required("Please enter your name"),
  email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
  phone: yup.number().required("Please enter your phone number"),
  message: yup.string(),
});

function BookingForm(props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [data, setData] = useState(null);

  function onSubmit(values) {
    setData(values);

    console.log(data);
    console.log(values);
  }

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"booking__form"}>
      <input {...register("accommodation")} value={props.accName} readonly />

      <section>
        <label>
          Check-in date <i className="fas fa-calendar-check d-inline-block"></i>
        </label>
        <Controller
          control={control}
          name="checkin"
          render={({ field }) => <ReactDatePicker className="input" placeholderText="Select check-in date" onChange={(e) => field.onChange(e)} selected={field.value} />}
        />{" "}
        {errors.checkin && <span>{errors.checkin.message}</span>}
      </section>

      <section>
        <label>
          Check-out date <i className="fas fa-calendar-check d-inline-block"></i>
        </label>
        <Controller
          control={control}
          name="checkout"
          render={({ field }) => <ReactDatePicker className="input" placeholderText="Select check-out date" onChange={(e) => field.onChange(e)} selected={field.value} />}
        />{" "}
        {errors.checkout && <span>{errors.checkout.message}</span>}
      </section>

      <section>
        <label>Number of guests</label>
        <Controller
          defaultValue="1"
          name="noOfGuests"
          control={control}
          render={({ field }) => (
            <ReactSelect
              {...field}
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
                { value: 6, label: "6" },
                { value: 7, label: "7" },
                { value: 8, label: "8" },
                { value: 9, label: "9" },
                { value: 10, label: "10" },
              ]}
            />
          )}
        />
      </section>

      <section>
        <label>Full name</label>
        <input {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </section>

      <section>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </section>

      <section>
        <label>Phone</label>
        <input {...register("phone")} />
        {errors.phone && <span>{errors.phone.message}</span>}
      </section>

      <section>
        <label>Message &amp; Special requests</label>
        <textarea {...register("message")} />
        {errors.message && <span>{errors.message.message}</span>}
      </section>

      <button>Submit</button>
    </form>
  );
}

export default BookingForm;
