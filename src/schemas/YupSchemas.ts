import * as yup from "yup";

const inputRules = /^[a-zA-Z0-9_-]+$/;

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, "Password must atleast be 5 characters")
    .matches(inputRules, { message: "No symbols allowed" })
    .required("Required")
    .trim(),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password do not match")
    .trim(),
});

export const signupSchema = yup.object().shape({
  rememeberme: yup.boolean(),
  username: yup
    .string()
    .min(3, "Username must atleast be 3 characters")
    .matches(inputRules, { message: "No symbols allowed" })
    .required("Required")
    .trim(),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5, "Password must atleast be 5 characters")
    .matches(inputRules, { message: "No symbols allowed" })
    .required("Required")
    .trim(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().required("Required").trim(),
});
