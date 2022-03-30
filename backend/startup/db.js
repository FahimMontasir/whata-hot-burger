const mongoose = require("mongoose");
const logger = require("../logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/full-backend", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to Mongo"));
};
