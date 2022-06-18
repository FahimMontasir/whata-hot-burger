const mongoose = require("mongoose");
const Joi = require("joi");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
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
    category: {
      type: [String], //["pizza","drink","dessert"] Model.find({ category: { "$in" : ["pizza"]} });
      required: true,
    },
    price: {
      type: Number,
      max: 100000,
      required: true,
    },
    discountRate: {
      type: Number,
      default: 0,
      max: 100,
    },
    size: String, //small:0,medium:34,name:price
    numberInStock: { type: Number, required: true },
    updateAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().max(100).min(2).required(),
    description: Joi.string().max(500).required(),
    photoUrl: Joi.string().required(),
    category: Joi.array().items(Joi.string().required()).required(),
    price: Joi.number().max(100000).required(),
    discountRate: Joi.number().max(100),
    size: Joi.any(),
    numberInStock: Joi.number().required(),
  });
  return schema.validate(product);
};

module.exports = { Product, validateProduct };
