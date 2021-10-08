// Import NPM module
const bcrypt = require("bcrypt");

// Import Settings
const settings = require("../../settings.js");

// export function that uses bcrypt to hash password together with some hash salt rounds
module.exports = async function hashPassword(password) {
  const hash = await bcrypt.hash(password, settings.saltRounds);
  
  // Return hash
  return hash;
}