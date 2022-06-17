const mongoose = require("mongoose");
const Joi = require("joi");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    foodId: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    foodId: Joi.objectId().required(),
    qty: Joi.number().required(),
  });
  return schema.validate(cart);
};

module.exports = { Cart, validateCart };
