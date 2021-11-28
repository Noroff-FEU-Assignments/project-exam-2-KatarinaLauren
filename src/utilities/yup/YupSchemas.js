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
  category: yup.mixed().oneOf(["Hotel", "BB", "Guesthouse"], "Please choose a category"),
  email: yup.string().email("Please enter a valid email address").required("Please enter the email address of the property"),
  facilities: yup.object().required(),
});

const date = new Date();
const tomorrow = new Date(date);
tomorrow.setDate(tomorrow.getDate() + 1);

export const bookingEnquirySchema = yup.object().shape({
  accommodation: yup.mixed().notOneOf(["select", ""]),
  checkin_date: yup.date().nullable().required().min(date),
  checkout_date: yup.date().nullable().required().min(tomorrow),
  number_of_guests: yup.number(),
  customer_name: yup.string().min(4, "Must be minimum 4 characters long").required("Please enter your name"),
  email: yup.string().email("Please enter a valid email address").required("Please enter an email address"),
  phone_number: yup.number().required(),
  message: yup.string(),
});

export const contactSchema = yup.object().shape({
  name: yup.string().min(4, "Must be minimum 4 characters long").required("Please enter your name"),
  email: yup.string().email("Please enter a valid email address").required("Please enter an email address"),
  phone: yup.number().required(),
  message: yup.string(),
});
