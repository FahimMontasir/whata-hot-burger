const express = require("express");
const _ = require("lodash");
const { validateId } = require("../../helper/validate");
const auth = require("../../middlewares/auth");
const manager = require("../../middlewares/auth/manager");
const { Product } = require("../../models/food");
const { validateCombo, Combo } = require("../../models/food/combo");

const router = express.Router();

//attention!
router.post("/add", [auth, manager], async (req, res) => {
  const { error } = validateCombo(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await Combo.create(req.body);

  res.status(200).json({ text: "Combo created successfully" });
});

//attention! get all combo || by category
router.get("/", async (req, res) => {
  const category = req.query.category || "";

  const data = await Combo.find({
    category: { $regex: category, $options: "/.*.*/i" },
  }).sort({ updatedAt: "desc" });

  if (!data.length) return res.status(400).json({ message: "combo not found" });

  res.status(200).json({
    array: _.map(
      data,
      _.partialRight(_.pick, [
        "_id",
        "photoUrl",
        "category",
        "extraDiscountRate",
      ])
    ),
  });
});

//attention! get single combo with details
router.get("/:_id", async (req, res) => {
  const { error } = validateId({ _id: req.params._id });
  if (error) return res.status(400).json({ message: error.message });

  const data = await Combo.findById(req.params._id);
  if (!data) return res.status(400).json({ message: "combo not found" });

  const allFood = await Product.find({
    _id: { $in: data.items },
    numberInStock: { $gt: 0 },
  }).sort({
    category: "asc",
  });
  if (!allFood.length)
    return res.status(400).json({ message: "combo food not found" });

  res.status(200).json({
    object: { ..._.omit(data.toObject(), ["_id", "items"]), food: allFood },
  });
});

//attention!
router.patch("/update", [auth, manager], async (req, res) => {
  const combo = await Combo.findById(req.body._id);
  if (!combo) return res.status(404).json({ message: "combo not found" });

  combo.set({
    ..._.omit(req.body, ["_id", "updatedAt"]),
    updatedAt: Date.now(),
  });
  await combo.save();

  return res.status(200).json({ text: "combo Updated successfully" });
});

//attention!
router.delete("/delete", [auth, manager], async (req, res) => {
  const { error } = validateId({ _id: req.body._id });
  if (error) return res.status(400).json({ message: error.message });

  const combo = await Combo.findById(req.body._id);
  if (!combo) return res.status(404).json({ message: "combo not found" });

  await combo.remove();

  res.status(200).json({ text: "combo Deleted successfully" });
});

module.exports = router;
