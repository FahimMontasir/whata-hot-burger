const mongoose = require("mongoose");
const Joi = require("joi");

const Dine = mongoose.model(
  "Dine",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  })
);

const validateDine = (dine) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().max(500).required(),
    photoUrl: Joi.string().required(),
  });
  return schema.validate(dine);
};

module.exports = { Dine, validateDine };
