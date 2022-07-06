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
    question: {
      type: String,
      maxlength: 100,
      required: true,
    },
    answer: {
      type: String,
      maxlength: 500,
    },
    isAdded: {
      type: Boolean,
      default: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateFAQ = (faq) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    question: Joi.string().max(100).required(),
  });
  return schema.validate(faq);
};

module.exports = { FAQ, validateFAQ };
