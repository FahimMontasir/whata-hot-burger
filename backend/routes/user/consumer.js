const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {
  Consumer,
  validateConsumer,
  validateConsumerLogin,
  validateChangePass,
} = require("../../models/user/consumer");
//utils
const generateJwt = require("../../helper/generateJwt");
const generateHash = require("../../helper/generateHash");
const { validateId } = require("../../helper/validate");
//middlewares
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/auth/admin");
const consumer = require("../../middlewares/auth/consumer");

const router = express.Router();

//attention! creating an consumer
router.post("/register", async (req, res) => {
  const { error } = validateConsumer(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;

  let consumer = await Consumer.findOne({ email });
  if (consumer)
    return res.status(400).json({ message: "User already registered." });

  consumer = new Consumer(
    _.pick(req.body, [
      "token",
      "name",
      "email",
      "photoUrl",
      "dateOfBirth",
      "gender",
    ])
  );
  consumer.password = await generateHash(password);
  await consumer.save();

  res.status(201).json({ text: "Account created successfully." });
});

//attention!
router.post("/login", async (req, res) => {
  const { error } = validateConsumerLogin(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;

  const consumer = await Consumer.findOne({ email });
  if (!consumer)
    return res
      .status(404)
      .json({ message: "Invalid phone number or password" });

  const validPassword = await bcrypt.compare(password, consumer.password);
  if (!validPassword)
    return res
      .status(404)
      .json({ message: "Invalid phone number or password" });

  const token = generateJwt(_.pick(consumer, ["_id", "type"]));

  res.status(200).json({ text: token });
});

//attention! change password
router.patch("/changePass", [auth, consumer], async (req, res) => {
  const { error } = validateChangePass(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { _id, oldPassword, newPassword } = req.body;

  const consumer = await Consumer.findById(_id);
  if (!consumer) return res.status(404).json({ message: "User not found" });

  if (req.user.type === "admin") {
    const hashedNewPassword = await generateHash(newPassword);

    consumer.set({ password: hashedNewPassword, updatedAt: Date.now() });
    await consumer.save();

    res.status(200).json({ text: "Password changed successfully -admin" });
  } else {
    const validPassword = await bcrypt.compare(oldPassword, consumer.password);
    if (!validPassword)
      return res.status(404).json({ message: "Invalid old password" });

    const hashedNewPassword = await generateHash(newPassword);

    consumer.set({ password: hashedNewPassword, updatedAt: Date.now() });
    await consumer.save();

    res.status(200).json({ text: "Password changed successfully" });
  }
});

// attention! get consumer by id
router.get("/:_id", [auth, consumer], async (req, res) => {
  const { error } = validateId({ _id: req.params._id });
  if (error) return res.status(400).json({ message: error.message });

  const consumer = await Consumer.findById(req.params._id);

  if (!consumer) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ object: _.omit(consumer.toObject(), ["password"]) });
});

//attention! update consumer data
router.patch("/update", [auth, consumer], async (req, res) => {
  const consumer = await Consumer.findById(req.body._id);
  if (!consumer) return res.status(404).json({ message: "User not found" });

  if (req.user.type === "admin") {
    consumer.set({
      ..._.omit(req.body, ["_id", "password", "updatedAt", "createdAt"]),
      updatedAt: Date.now(),
    });
    await consumer.save();

    return res.status(200).json({ text: "Updated successfully -admin" });
  } else {
    const singleConsumer = await Consumer.findById(req.user._id);

    singleConsumer.set({
      ..._.omit(req.body, [
        "_id",
        "password",
        "type",
        "updatedAt",
        "createdAt",
      ]),
      updatedAt: Date.now(),
    });
    await singleConsumer.save();

    return res.status(200).json({ text: "Updated successfully" });
  }
});

//?-------------------------------admin--------------------------------

//attention! delete consumer ---admin
router.delete("/delete", [auth, admin], async (req, res) => {
  const consumer = await Consumer.findById(req.body._id);
  if (!consumer) return res.status(404).json({ message: "User not found" });

  await consumer.remove();

  res.status(200).json({ text: "User Deleted successfully" });
});

//attention! get all consumer at a time
router.get("/", [auth, admin], async (req, res) => {
  const { pageNumber, pageSize } = req.query;

  const limit = parseInt(pageSize);
  const offset = (parseInt(pageNumber) - 1) * limit;

  const users = await Consumer.find()
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: "desc" });

  if (users.length === 0)
    return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    array: _.map(
      users,
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

//attention! get consumers by name | email
router.get("/search/query", [auth, admin], async (req, res) => {
  const { name, email } = req.query;

  const users = await Consumer.find()
    .or([{ name: { $regex: name, $options: "/.*.*/i" } }, { email }])
    .sort({ createdAt: "desc" });

  if (users.length === 0)
    return res.status(404).json({ message: "No result found" });

  res.status(200).json({ array: users });
});

module.exports = router;
