import * as Yup from "yup";

export const FoodSchema = Yup.object().shape({
  name: Yup.string().max(100).min(2).required("Name is required"),
  description: Yup.string().max(500).required("Description is required"),
  photoUrl: Yup.string().required("Photo is required"),
  category: Yup.array()
    .of(Yup.string().required("Category is missing"))
    .required("Food category is required"),
  price: Yup.number().max(100000).required("Price is required"),
  discountRate: Yup.number().max(100),
  size: Yup.string(),
  numberInStock: Yup.number()
    .moreThan(0)
    .required("Number in stock is required"),
});

export const getFoodInitialValues = (currentUser) => {
  return {
    _id: currentUser?._id,
    name: currentUser?.name || "",
    description: currentUser?.description || "",
    photoUrl: currentUser?.photoUrl || "",
    category: currentUser?.category || [],
    price: currentUser?.price || 0,
    discountRate: currentUser?.discountRate || 0,
    size: currentUser?.size || "",
    numberInStock: currentUser?.numberInStock || 0,
  };
};

export const CATEGORY_OPTION = [
  "burgers",
  "pizza",
  "salads",
  "sandwiches",
  "sides",
  "beverages",
];

// more https://www.researchgate.net/figure/Fast-food-categorization-system-Fast-food-category-Description_tbl1_272751243
