const jwt = require("jsonwebtoken");
const config = require("config");

const generateJwt = (data) => jwt.sign(data, config.get("jwtPrivateKey"));

module.exports = generateJwt;
