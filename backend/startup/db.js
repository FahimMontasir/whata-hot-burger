const mongoose = require("mongoose");
const logger = require("../logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/whb_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to Mongo"));
};
