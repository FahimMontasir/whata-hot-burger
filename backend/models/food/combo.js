const mongoose = require("mongoose");
const Joi = require("joi");

const Combo = mongoose.model(
  "Combo",
  new mongoose.Schema({
    photoUrl: {
      type: String,
      required: true,
    },
    category: {
      //exclusive/spicy/special
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    items: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    uptoDiscountRate: {
      // its just to show the upto discount of food
      type: Number,
      default: 0,
      max: 100,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateCombo = (combo) => {
  const schema = Joi.object({
    photoUrl: Joi.string().required(),
    category: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(500).required(),
    items: Joi.array().items(Joi.objectId().required()).required(),
    uptoDiscountRate: Joi.number().max(100),
  });
  return schema.validate(combo);
};

module.exports = { Combo, validateCombo };
