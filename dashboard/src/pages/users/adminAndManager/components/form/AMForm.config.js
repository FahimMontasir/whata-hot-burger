import * as Yup from "yup";

export const AMSchema = Yup.object().shape({
  photoUrl: Yup.string("Avatar is invalid").max(255, "Avatar is too long"),
  name: Yup.string().min(3).max(50).required("Name is required"),
  email: Yup.string().max(75).required("Email is required").email(),
  password: Yup.string().min(6).max(50).required("Password is required"),
  contactNo: Yup.string()
    .matches(
      /(^(\+88|0088)?(01){1}[356789]{1}(\d){8})$/,
      "Phone number must be valid Bangladeshi number"
    )
    .required("Phone number is required"),
  type: Yup.string("type is invalid").max(10).required("Type is required"),
  managerialPosition: Yup.string("Invalid managerial position").max(50),
  dateOfBirth: Yup.string().max(20).required("Date of birth is required"),
});

export const getAMInitialValues = (currentUser) => {
  return {
    photoUrl: currentUser?.photoUrl || "",
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
    contactNo: currentUser?.contactNo || "",
    type: currentUser?.type || "",
    managerialPosition: currentUser?.managerialPosition || "",
    dateOfBirth: currentUser?.dateOfBirth || "",
  };
};
