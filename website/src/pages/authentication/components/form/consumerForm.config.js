import * as Yup from "yup";

export const AMSchema = Yup.object().shape({
  photoUrl: Yup.string("Avatar is invalid").max(255, "Avatar is too long"),
  name: Yup.string().min(3).max(50).required("Name is required"),
  email: Yup.string().max(75).required("Email is required").email(),
  password: Yup.string().min(6).max(50).required("Password is required"),
  gender: Yup.string().required("Gender is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
});

export const getAMInitialValues = (currentUser) => {
  return {
    _id: currentUser?._id,
    photoUrl: currentUser?.photoUrl || "",
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
    gender: currentUser?.gender || "",
    dateOfBirth: currentUser?.dateOfBirth || null,
  };
};
