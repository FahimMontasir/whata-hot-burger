const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
//routes
const consumer = require("../routes/user/consumer");
const adminAndManager = require("../routes/user/adminAndManager");
const product = require("../routes/food");
const combo = require("../routes/food/combo");
const cart = require("../routes/purchase/cart");
const invoice = require("../routes/purchase/invoice");
//error handling
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use("/consumer", consumer);
  app.use("/am", adminAndManager);
  app.use("/product", product);
  app.use("/combo", combo);
  app.use("/cart", cart);
  app.use("/invoice", invoice);

  //positioned last
  app.use(error);
};
