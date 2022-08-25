import * as Yup from "yup";

export const DineSchema = Yup.object().shape({
  name: Yup.string().max(100).min(2).required("Name is required"),
  description: Yup.string().max(500).required("Description is required"),
  photoUrl: Yup.string().required("Photo is required"),
});

export const getDineInitialValues = (currentUser) => {
  return {
    _id: currentUser?._id,
    name: currentUser?.name || "",
    description: currentUser?.description || "",
    photoUrl: currentUser?.photoUrl || "",
  };
};
