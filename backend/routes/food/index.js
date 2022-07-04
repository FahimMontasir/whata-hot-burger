const express = require("express");
const _ = require("lodash");
const { validateId } = require("../../helper/validate");
const auth = require("../../middlewares/auth");
const manager = require("../../middlewares/auth/manager");
const { validateProduct, Product } = require("../../models/food");

const router = express.Router();

//attention!
router.post("/add", [auth, manager], async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.message });

  await Product.create(req.body);

  res.status(200).json({ text: "Product created successfully" });
});

//attention! get single food
router.get("/:_id", async (req, res) => {
  const { error } = validateId({ _id: req.params._id });
  if (error) return res.status(400).json({ message: error.message });

  const data = await Product.findById(req.params._id);
  if (!data) return res.status(400).json({ message: "Food not found" });

  res.status(200).json({ object: data });
});

//attention! get all food by category
router.get("/", async (req, res) => {
  const category = req.query.category;

  const data = await Product.find({ category: { $in: [category] } }).sort({
    updatedAt: "desc",
  });

  if (!data.length) return res.status(400).json({ message: "Food not found" });

  res.status(200).json({ array: data });
});

//attention!
router.patch("/update", [auth, manager], async (req, res) => {
  const food = await Product.findById(req.body._id);
  if (!food) return res.status(404).json({ message: "Food not found" });

  food.set({
    ..._.omit(req.body, ["_id", "updatedAt"]),
    updatedAt: Date.now(),
  });
  await food.save();

  return res.status(200).json({ text: "Food Updated successfully" });
});

//attention!
router.delete("/delete", [auth, manager], async (req, res) => {
  const { error } = validateId({ _id: req.body._id });
  if (error) return res.status(400).json({ message: error.message });

  const food = await Product.findById(req.body._id);
  if (!food) return res.status(404).json({ message: "Food not found" });

  await food.remove();

  res.status(200).json({ text: "food Deleted successfully" });
});

module.exports = router;
