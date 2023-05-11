const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hashedPassword = bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const match = bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = { hashPassword, comparePassword };
