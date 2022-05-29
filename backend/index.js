require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./logger");

const app = express();

require("./startup/logger")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost/whb_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, logger.info("Listening port " + PORT)))
  .catch((err) => logger.error(err));
