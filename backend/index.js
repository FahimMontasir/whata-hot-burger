require("express-async-errors");
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const logger = require("./logger");

const app = express();

app.enable("trust proxy");

require("./startup/logger")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 5000;
const mongUrl = `mongodb://${config.get("db_user")}:${config.get(
  "db_pass"
)}@${config.get("db_ip")}:${config.get("db_port")}/${config.get(
  "db_name"
)}?authSource=admin`;

mongoose
  .connect(mongUrl)
  .then(() => app.listen(PORT, logger.info("Listening port..." + PORT)))
  .catch((err) => logger.error(err));
