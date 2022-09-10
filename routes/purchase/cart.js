const express = require("express");
const _ = require("lodash");
const { validateId } = require("../../helper/validate");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/auth/admin");
const consumer = require("../../middlewares/auth/consumer");
const { Product } = require("../../models/food");
const { Consumer } = require("../../models/user/consumer");
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

  const combo = await Cart.find({
    comboId: req.body[0].comboId,
    userId: req.body[0].userId,
  });
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
    userId: req.body.userId,
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

  const data = await Cart.find({ userId: req.params.userId }).select(
    "-updatedAt -__v -userId"
  );
  if (!data.length) return res.status(400).json({ message: "Cart not found" });

  const toStrCart = data.map((c) => {
    return {
      cartId: c._id,
      qty: c.qty,
      size: c.size,
      comboId: c.comboId.toString(),
      foodId: c.foodId.toString(),
    };
  });
  // console.log("cart", toStrCart);

  const foodIds = data.map((e) => e.foodId);
  const allFood = await Product.find({ _id: { $in: foodIds } }).select(
    "-size -updatedAt -__v"
  );
  if (!allFood.length)
    return res.status(400).json({ message: "Food not found" });

  const toStrAllFood = allFood.map((f) => {
    return { ...f._doc, _id: f._id.toString() };
  });
  // console.log("food", toStrAllFood);

  const mergedByKey = _.merge(
    _.keyBy(toStrCart, "foodId"),
    _.keyBy(toStrAllFood, "_id")
  );
  const mergedAll = _.values(mergedByKey);
  // console.log("merged", merged);

  const merged = mergedAll.filter((v) => v.price && v.name);

  const totalQty = merged.reduce((sum, v) => sum + v.qty, 0);

  const sizeArr = merged.map((e) => {
    return {
      value: parseInt(e.size.split(":")[1], 10) || 0,
      qty: e.qty,
    };
  });
  const sizeTk = sizeArr.reduce((sum, v) => sum + v.value * v.qty, 0);

  const subTotal = merged.reduce((sum, v) => sum + v.price * v.qty, 0) + sizeTk;
  const discount = merged.reduce(
    (sum, v) => sum + Math.round(v.price * v.qty * (v.discountRate / 100)),
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

//attention
router.delete("/delete", [auth, consumer], async (req, res) => {
  const { error } = validateId({ _id: req.body._id });
  if (error) return res.status(400).json({ message: error.message });

  const cart = await Cart.findOne({ _id: req.body._id, userId: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  await cart.remove();

  res.status(200).json({ text: "Item deleted successfully" });
});

//attention
router.delete("/deleteAll", [auth, consumer], async (req, res) => {
  await Cart.deleteMany({
    userId: req.user._id,
  });

  res.status(200).json({ text: "Item deleted successfully" });
});

//attention! get consumer who has food in cart
router.get("/user/hasCart", [auth, admin], async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(pageNumber) - 1) * limit;

  const cartUserIds = await Cart.find().sort({ updatedAt: "desc" });

  const uniqueUser = [
    ...new Map(cartUserIds.map((v) => [v.patientId, v])).values(),
  ];
  const userIds = uniqueUser.map((v) => v.userId);

  const hasCartUser = await Consumer.find({ _id: userIds })
    .skip(offset)
    .limit(limit);
  if (hasCartUser.length == 0)
    res.status(404).json({ message: "No user found with cart" });

  res.status(200).json({
    array: _.map(
      hasCartUser,
      _.partialRight(_.pick, [
        "_id",
        "type",
        "name",
        "email",
        "photoUrl",
        "dateOfBirth",
        "gender",
        "createdAt",
        "updatedAt",
      ])
    ),
  });
});

module.exports = router;
