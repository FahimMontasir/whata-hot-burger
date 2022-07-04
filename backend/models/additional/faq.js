const mongoose = require("mongoose");
const Joi = require("joi");

const FAQ = mongoose.model(
  "FAQ",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      maxlength: 100,
      required: true,
    },
    message: {
      type: String,
      maxlength: 500,
      required: true,
    },
    isAdded: {
      type: Boolean,
      default: false,
    },
  })
);

const validateFAQ = (faq) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().max(100).required(),
    message: Joi.string().max(500).required(),
  });
  return schema.validate(faq);
};

module.exports = { FAQ, validateFAQ };
