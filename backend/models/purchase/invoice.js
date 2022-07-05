const mongoose = require("mongoose");
const Joi = require("joi");

const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema({
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: {
      type: Object,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: { Method: String, isSuccess: Boolean, details: String },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateInvoice = (invoice) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    address: Joi.string().required(),
    items: Joi.object().required(),
    paidAmount: Joi.number().required(),
    paymentStatus: Joi.object({
      Method: Joi.string().required(),
      isSuccess: Joi.boolean().required(),
      details: Joi.string().required(),
    }),
  });
  return schema.validate(invoice);
};

module.exports = { Invoice, validateInvoice };
