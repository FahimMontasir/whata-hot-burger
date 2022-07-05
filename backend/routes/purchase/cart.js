const express = require("express");
const _ = require("lodash");
const { validateId } = require("../../helper/validate");
const auth = require("../../middlewares/auth");
const consumer = require("../../middlewares/auth/consumer");
const { Product } = require("../../models/food");
const {
  validateCart,
  Cart,
  validateSingleCart,
} = require("../../models/purchase/cart");

const router = express.Router();

//attention! add combo to cart
router.post("/add", [auth, consumer], async (req, res) => {
  const { error } = validateCart(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const combo = await Cart.find({ comboId: req.body[0].comboId });
  if (combo.length)
    return res.status(400).json({ message: "Combo already added." });

  await Cart.insertMany(req.body);

  res.status(200).json({ text: "Cart added successfully!" });
});

//attention! add single food to cart
router.post("/add/singleFood", [auth, consumer], async (req, res) => {
  const { error } = validateSingleCart(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const cart = await Cart.findOne({
    foodId: req.body.foodId,
    comboId: "notACombo",
  });

  if (cart) {
    cart.set({
      ..._.omit({ ...req.body, qty: req.body.qty + cart.qty }, [
        "_id",
        "updatedAt",
      ]),
      updatedAt: Date.now(),
    });
    await cart.save();
  } else {
    await Cart.create(req.body);
  }

  res.status(200).json({ text: "added to cart successfully!" });
});

//attention! get a consumer cart with food details and calculation
router.get("/:userId", [auth, consumer], async (req, res) => {
  const { error } = validateId({ _id: req.params.userId });
  if (error) return res.status(400).json({ message: error.message });

  const data = await Cart.find({ userId: req.params.userId });
  if (!data.length) return res.status(400).json({ message: "Cart not found" });

  const foodIds = data.map((e) => e.foodId);
  const allFood = await Product.find({ _id: { $in: foodIds } });
  if (!allFood.length)
    return res.status(400).json({ message: "Food not found" });

  let merged = [];

  for (let i = 0; i < data.length; i++) {
    merged.push({
      ..._.omit(data[i].toObject(), ["userId", "__v"]),
      ..._.omit(
        allFood
          .find((e) => e._id.toString() === data[i].foodId.toString())
          .toObject(),
        [
          "_id",
          "size",
          "updatedAt",
          "__v",
          "category",
          "numberInStock",
          "description",
        ]
      ),
    });
  }
  const totalQty = merged.reduce((sum, v) => sum + v.qty, 0);

  const sizeArr = merged.map((e) => parseInt(e.size.split(":")[1], 10) || 0);
  const sizeTk = sizeArr.reduce((sum, v) => sum + v, 0);

  const subTotal = merged.reduce((sum, v) => sum + v.price, 0) + sizeTk;
  const discount = merged.reduce(
    (sum, v) => sum + Math.round(v.price * (v.discountRate / 100)),
    0
  );
  const total = subTotal - discount;

  res.status(200).json({
    totalQty,
    subTotal,
    discount,
    total,
    food: _.groupBy(
      merged.sort((a, b) => b.updatedAt - a.updatedAt),
      "comboId"
    ),
  });
});

//attention! update product qty
router.patch("/update", [auth, consumer], async (req, res) => {
  const cart = await Cart.findOne({ _id: req.body._id, userId: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.set({
    qty: req.body.qty,
    size: req.body.size,
    updatedAt: Date.now(),
  });
  await cart.save();

  return res.status(200).json({ text: "Cart Updated successfully" });
});

//attention!
router.delete("/delete", [auth, consumer], async (req, res) => {
  const { error } = validateId({ _id: req.body._id });
  if (error) return res.status(400).json({ message: error.message });

  const cart = await Cart.findOne({ _id: req.body._id, userId: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  await cart.remove();

  res.status(200).json({ text: "Item deleted successfully" });
});

module.exports = router;
