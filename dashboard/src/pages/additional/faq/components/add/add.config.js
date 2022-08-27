import * as Yup from "yup";

export const FAQSchema = Yup.object().shape({
  name: Yup.string().min(5).max(50).required(),
  email: Yup.string().email().required(),
  question: Yup.string().max(500).required(),
  answer: Yup.string(),
  isAdded: Yup.boolean().required(),
});

export const getFAQInitialValues = (currentData) => {
  return {
    _id: currentData?._id,
    name: currentData?.name || "",
    email: currentData?.email || "",
    question: currentData?.question || "",
    answer: currentData?.answer || "",
    isAdded: currentData?.isAdded || false,
  };
};
