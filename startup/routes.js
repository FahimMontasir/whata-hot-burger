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
const dine = require("../routes/purchase/dine");
const blog = require("../routes/additional/blog");
const faq = require("../routes/additional/faq");
const termsCondition = require("../routes/additional/termsAndCondition");
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
  app.use("/dine", dine);
  app.use("/blog", blog);
  app.use("/faq", faq);
  app.use("/termsCondition", termsCondition);

  //positioned last
  app.use(error);
};
