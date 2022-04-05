const mongoose = require("mongoose");
const Joi = require("joi");

const AdminAndManager = mongoose.model(
  "AdminAndManager",
  new mongoose.Schema({
    token: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      required: true,
      maxlength: 10,
    },
    managerialPosition: {
      type: String,
      maxlength: 50,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    contactNo: {
      type: String,
      required: true,
      length: 11,
    },
    email: {
      type: String,
      required: true,
      maxlength: 75,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      maxlength: 255,
    },
    dateOfBirth: {
      type: String,
      maxlength: 20,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

const validateAdminAndManager = (adminAndManager) => {
  const schema = Joi.object({
    token: Joi.string(),
    type: Joi.string().max(10).required(),
    managerialPosition: Joi.string().max(50),
    name: Joi.string().min(3).max(50).required(),
    contactNo: Joi.string().length(11).required(),
    email: Joi.string().email().max(75).required(),
    password: Joi.string().min(6).max(50).required(),
    photoUrl: Joi.string().max(255),
    dateOfBirth: Joi.string().max(20).required(),
  });
  return schema.validate(adminAndManager);
};

module.exports = { AdminAndManager, validateAdminAndManager };
