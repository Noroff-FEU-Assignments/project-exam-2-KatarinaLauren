import * as yup from "yup";

export const propertySchema = yup.object().shape({
  name: yup.string().required("Please enter the name of the property"),
  description: yup.string().min(20, "Must be minimum 20 characters long").required(),
  room_rate: yup.number().typeError("Please enter the minimum room rate").required(),
  phone: yup.number().typeError("Please enter the phone number of the property").required(),
  address: yup.string().required("Please enter the visiting address of the property"),
  latitude: yup.number().typeError("Please enter latitude").required(),
  longitude: yup.number().typeError("Please enter longitude").required(),
  location: yup.string().required("Please enter the general location of the property"),
  category: yup.mixed().oneOf(["Hotel", "BB", "Guesthouse"]),
  email: yup.string().email("Please enter a valid email address").required("Please enter the email address of the property"),
  facilities: yup.object().required(),
});
