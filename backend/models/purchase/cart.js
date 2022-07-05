const mongoose = require("mongoose");
const Joi = require("joi");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    foodId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    qty: {
      type: Number,
      default: 1,
      required: true,
    },
    size: { type: String, default: "standard:0" },
    comboId: { type: String, default: "notACombo" },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateCart = (cart) => {
  const schema = Joi.array().items(
    Joi.object({
      userId: Joi.objectId().required(),
      foodId: Joi.objectId().required(),
      qty: Joi.number().required(),
      size: Joi.any(),
      comboId: Joi.objectId().required(),
    })
  );
  return schema.validate(cart);
};

const validateSingleCart = (cart) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    foodId: Joi.objectId().required(),
    qty: Joi.number().required(),
    size: Joi.any(),
  });

  return schema.validate(cart);
};

module.exports = { Cart, validateCart, validateSingleCart };
