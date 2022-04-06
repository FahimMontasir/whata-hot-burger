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
//middlewares
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/auth/admin");
const consumer = require("../../middlewares/auth/consumer");

const router = express.Router();

//attention! creating an consumer
router.post("/register", async (req, res) => {
  const { error } = validateConsumer(req.body);
  if (error) return res.status(400).send(error.message);

  const { email, password } = req.body;

  let consumer = await Consumer.findOne({ email });
  if (consumer) return res.status(400).send("User already registered.");

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

  res.status(201).send(consumer);
});

//attention!
router.post("/login", async (req, res) => {
  const { error } = validateConsumerLogin(req.body);
  if (error) return res.status(400).send(error.message);

  const { email, password } = req.body;

  const consumer = await Consumer.findOne({ email });
  if (!consumer)
    return res.status(404).send("Invalid phone number or password");

  const validPassword = await bcrypt.compare(password, consumer.password);
  if (!validPassword)
    return res.status(404).send("Invalid phone number or password");

  const token = generateJwt(_.pick(consumer, ["_id", "type"]));

  res.status(200).send(token);
});

//attention! change password
router.patch("/changePass", [auth, consumer], async (req, res) => {
  const { error } = validateChangePass(req.body);
  if (error) return res.status(400).send(error.message);

  const { _id, oldPassword, newPassword } = req.body;

  const consumer = await Consumer.findById(_id);
  if (!consumer) return res.status(404).send("User not found");

  if (req.user.type === "admin") {
    const hashedNewPassword = await generateHash(newPassword);

    consumer.set({ password: hashedNewPassword, updatedAt: Date.now() });
    await consumer.save();

    res.status(200).send("Password changed successfully -admin");
  } else {
    const validPassword = await bcrypt.compare(oldPassword, consumer.password);
    if (!validPassword) return res.status(404).send("Invalid old password");

    const hashedNewPassword = await generateHash(newPassword);

    consumer.set({ password: hashedNewPassword, updatedAt: Date.now() });
    await consumer.save();

    res.status(200).send("Password changed successfully");
  }
});

// attention! get consumer by id
router.get("/:_id", [auth, consumer], async (req, res) => {
  const consumer = await Consumer.findById(req.params._id);

  if (!consumer) return res.status(404).send("User not found");

  res.status(200).send(_.omit(consumer.toObject(), ["password"]));
});

//attention! update consumer data
router.patch("/update", [auth, consumer], async (req, res) => {
  const consumer = await Consumer.findById(req.body._id);
  if (!consumer) return res.status(404).send("User not found");

  if (req.user.type === "admin") {
    consumer.set({
      ..._.omit(req.body, [
        "_id",
        "password",
        "type",
        "updatedAt",
        "createdAt",
      ]),
      updatedAt: Date.now(),
    });
    await consumer.save();

    return res.status(200).send("Updated successfully -admin");
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

    return res.status(200).send("Updated successfully");
  }
});

//?-------------------------------admin--------------------------------

//attention! delete consumer ---admin
router.delete("/delete", [auth, admin], async (req, res) => {
  const consumer = await Consumer.findById(req.body._id);
  if (!consumer) return res.status(404).send("User not found");

  await consumer.remove();

  res.status(200).send("User Deleted successfully");
});

module.exports = router;
