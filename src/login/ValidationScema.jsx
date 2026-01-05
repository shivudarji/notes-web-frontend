import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "Name can’t be longer than 50 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Name can’t be longer than 50 characters")
    .required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password at least 6 characters")
    .required("Please enter your password"),
  cpswd: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "password must match"),
});

export const LoginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password at least 6 characters")
    .required("Please enter your password"),
});

export const ProfileSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name cannot be longer than 50 characters")
    .required("First Name is required"),

  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name cannot be longer than 50 characters")
    .required("Last Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  hobbies: Yup.array()
    .min(1, "Select at least one hobby")
    .required("Hobbies are required"),

  gender: Yup.string().required("Gender is required"),

  country: Yup.string().required("Country is required"),

  state: Yup.string().required("State is required"),

  dateOfBirth: Yup.date().required("Date of Birth is required"),
  eventTime: Yup.string().required("Time is required"),
});
