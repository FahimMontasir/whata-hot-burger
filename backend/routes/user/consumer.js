const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const {
  Consumer,
  validateConsumer,
  validateConsumerLogin,
} = require("../../models/user/consumer");
//utils
const generateJwt = require("../../helper/generateJwt");
const generateHash = require("../../helper/generateHash");

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

  const token = await generateJwt(_.pick(consumer, ["_id", "type"]));

  res.status(200).send(token);
});

module.exports = router;
