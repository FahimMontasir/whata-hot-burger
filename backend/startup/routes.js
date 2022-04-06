const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
//routes
const consumer = require("../routes/user/consumer");
const adminAndManager = require("../routes/user/adminAndManager");
//error handling
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use("/consumer", consumer);
  app.use("/am", adminAndManager);

  //positioned last
  app.use(error);
};
