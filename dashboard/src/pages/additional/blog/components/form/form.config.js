import * as Yup from "yup";

export const TAGS_OPTION = [
  "Hot",
  "Spicy",
  "Cool",
  "Fast Food",
  "Burgers",
  "Whata Hot Burger",
  "Beverage",
  "Hot Pizza",
  "Special Deals",
];

export const getBlogInitialValue = (currentValue) => {
  return {
    _id: currentValue?._id,
    title: currentValue?.title || "",
    shortDescription: currentValue?.shortDescription || "",
    content: currentValue?.content || "",
    cover: currentValue?.cover || "",
    tags: currentValue?.tags || ["Burgers"],
    publish: currentValue?.publish || false,
    comments: currentValue?.comments || false,
    metaTitle: currentValue?.metaTitle || "",
    metaDescription: currentValue?.metaDescription || "",
    metaKeywords: currentValue?.metaKeywords || ["Whata Hot Burger", "Burgers"],
  };
};

export const BlogSchema = Yup.object().shape({
  title: Yup.string().min(5).max(80).required(),
  shortDescription: Yup.string().min(20).max(150).required(),
  content: Yup.string().required(),
  cover: Yup.string().required(),
  tags: Yup.array().of(Yup.string().required()).required(),
  publish: Yup.boolean().required(),
  comments: Yup.boolean().required(),
  metaTitle: Yup.string().min(5).max(80).required(),
  metaDescription: Yup.string().min(20).max(150).required(),
  metaKeywords: Yup.array().of(Yup.string().required()).required(),
});
