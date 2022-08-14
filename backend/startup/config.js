const config = require("config");

module.exports = function () {
  if (
    !config.get("jwtPrivateKey") ||
    !config.get("db_name") ||
    !config.get("db_user") ||
    !config.get("db_pass") ||
    !config.get("db_port") ||
    !config.get("db_ip")
  ) {
    throw new Error("FATAL ERROR: privet key is missing");
  }
};
