require("express-async-errors");
const express = require("express");
const logger = require("./logger");

const app = express();

require("./startup/logger")();
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, logger.info("Listening port " + PORT));
