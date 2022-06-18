const mongoose = require("mongoose");
const Joi = require("joi");

const TermsCondition = mongoose.model(
  "TermsCondition",
  new mongoose.Schema({
    content: {
      type: String, //using markdown
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateTermsCondition = (termsCondition) => {
  const schema = Joi.object({
    content: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(termsCondition);
};

module.exports = { TermsCondition, validateTermsCondition };
