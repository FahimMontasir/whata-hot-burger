const mongoose = require("mongoose");
const Joi = require("joi");

const Consumer = mongoose.model(
  "Consumer",
  new mongoose.Schema({
    type: {
      type: String,
      default: "consumer",
    },
    token: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 75,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      maxlength: 255,
    },
    dateOfBirth: {
      type: String,
      maxlength: 20,
      required: true,
    },
    gender: {
      type: String,
      maxlength: 10,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  })
);

const validateConsumer = (consumer) => {
  const schema = Joi.object({
    token: Joi.any(),
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().max(75).required(),
    password: Joi.string().min(6).max(50).required(),
    photoUrl: Joi.any(),
    dateOfBirth: Joi.string().max(20).required(),
    gender: Joi.string().max(10).required(),
  });
  return schema.validate(consumer);
};

const validateConsumerLogin = (consumer) => {
  const schema = Joi.object({
    email: Joi.string().email().max(75).required(),
    password: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(consumer);
};

const validateChangePass = (consumer) => {
  const schema = Joi.object({
    _id: Joi.objectId().required(),
    oldPassword: Joi.any(),
    newPassword: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(consumer);
};

module.exports = {
  Consumer,
  validateConsumer,
  validateConsumerLogin,
  validateChangePass,
};
