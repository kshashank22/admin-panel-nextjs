import * as yup from "yup";

export const registerValidateSchema: any = yup.object({
  name: yup
    .string()
    .min(3, "Name must be atleast 3 characters")
    .required("Name is Required"),
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters."),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginValidateSchema: any = yup.object({
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const forgotValidateSchema: any = yup.object({
  email: yup.string().email("Email must valid").required("Email is Required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters."),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const userValidateSchema: any = yup.object({
  firstname: yup
    .string()
    .min(3, "Name required atleast 3 characters")
    .required("FirstName is Required"),
  lastname: yup
    .string()
    .min(3, "Name required atleast 3 characters")
    .required("LastName is Required"),
  email: yup.string().email("Email must valid").required("Email is Required"),
  fathersname: yup
    .string()
    .min(3, "Name required atleast 3 characters")
    .required("FathersName is Required"),
  mothersname: yup
    .string()
    .min(3, "Name required atleast 3 characters")
    .required("MothersName is Required"),
  address: yup.string().required("Address is Required"),
  pincode: yup.string().required("Pincode is Required"),
  city: yup.string().required("City is Required"),
});

export const RegisterDetails = [
  { text: "Name", id: "name", type: "text" },
  { text: "Email", id: "email", type: "email" },
  { text: "Password", id: "password", type: "password" },
  { text: "Confirm Password", id: "confirmpassword", type: "password" },
];
export const LoginDetails = [
  { text: "Email", id: "email", type: "text" },
  { text: "Password", id: "password", type: "password" },
];
export const ResetDetails = [
  { text: "Email", id: "email", type: "text" },
  { text: "New Password", id: "password", type: "password" },
  { text: "Confirm New Password", id: "confirmpassword", type: "password" },
];
export const UserDetails = [
  { text: "FirstName", id: "firstname", type: "text" },
  { text: "LastName", id: "lastname", type: "text" },
  { text: "Email", id: "email", type: "email" },
  { text: "FathersName", id: "fathersname", type: "text" },
  { text: "MothersName", id: "mothersname", type: "text" },
  { text: "Address", id: "address", type: "text" },
  { text: "City", id: "city", type: "text" },
  { text: "Pincode", id: "pincode", type: "number" },
];
