const mongoose = require("mongoose");
const Joi = require("joi");

const Invoice = mongoose.model(
  "Invoice",
  new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: {
      type: [
        {
          _id: String,
          name: String,
          photoUrl: String,
          qty: Number,
          price: Number,
          discount: Number,
          total: Number,
        },
      ],
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
    //attention! need to make joi array of object
    items: Joi.array().required(),
    paymentStatus: Joi.object({
      Method: Joi.string().required(),
      isSuccess: Joi.boolean().required(),
      details: Joi.string().required(),
    }),
  });
  return schema.validate(invoice);
};

module.exports = { Invoice, validateInvoice };
