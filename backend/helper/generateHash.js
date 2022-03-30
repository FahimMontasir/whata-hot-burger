const bcrypt = require("bcrypt");

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = generateHash;
