import * as Yup from "yup";

export const ComboSchema = Yup.object().shape({
  photoUrls: Yup.array().of(Yup.string().required()).required(),
  category: Yup.string().min(2).max(50).required(),
  description: Yup.string().max(500).required(),
  items: Yup.array().of(Yup.string().required()).required(),
  uptoDiscountRate: Yup.number().max(100),
});

export const getFoodInitialValues = (currentUser) => {
  return {
    _id: currentUser?._id,
    photoUrls: currentUser?.photoUrls || [],
    category: currentUser?.category || "",
    description: currentUser?.description || "",
    items: currentUser?.items || [],
    uptoDiscountRate: currentUser?.uptoDiscountRate || 0,
  };
};

export const CATEGORY_OPTION = ["Hot", "Special deals", "Spicy", "Cold Chill"];
