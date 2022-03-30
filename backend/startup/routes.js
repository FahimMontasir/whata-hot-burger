const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const demo = require("../routes/demo");

const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use("/demo", demo);

  //positioned last
  app.use(error);
};
