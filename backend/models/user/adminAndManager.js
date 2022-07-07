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
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  })
);

const validateAdminAndManager = (adminAndManager) => {
  const schema = Joi.object({
    token: Joi.string(),
    type: Joi.string().max(10).required(),
    managerialPosition: Joi.any(),
    name: Joi.string().min(3).max(50).required(),
    contactNo: Joi.string()
      .regex(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)
      .required(),
    email: Joi.string().email().max(75).required(),
    password: Joi.string().min(6).max(50).required(),
    photoUrl: Joi.any(),
    dateOfBirth: Joi.date().required(),
  });
  return schema.validate(adminAndManager);
};

const validateAdminAndMLogin = (adminAndManager) => {
  const schema = Joi.object({
    email: Joi.string().email().max(75).required(),
    password: Joi.string().min(6).max(50).required(),
  });
  return schema.validate(adminAndManager);
};

module.exports = {
  AdminAndManager,
  validateAdminAndManager,
  validateAdminAndMLogin,
};
