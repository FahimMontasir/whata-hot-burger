const logger = require("../logger");

const error = (err, req, res, next) => {
  logger.error(err);

  res.status(500).send("Something failed🥺 Please try again later!");
};

module.exports = error;
