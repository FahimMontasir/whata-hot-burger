import * as Yup from "yup";

export const SearchSchema = Yup.object().shape({
  contactNo: Yup.string(),
  name: Yup.string().nullable(),
  email: Yup.string().email(),
});

export const initialSearchValue = {
  contactNo: "",
  name: "",
  email: "",
};
