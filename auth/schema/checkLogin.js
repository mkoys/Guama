// Import utils
const isObject = require("../../utils/isObject.js");

module.exports = async function (data) {
  // Credentail variables
  let type;
  let credential;

  // Result store
  let result = {
    code: 200,
    messages: []
  }

  /* Sets creadentail type and saves it based 
  on input if none error 1 is username 0 is email */
  if (data.email) {
    credential = data.email;
    type = 0;
  } else if (data.username) {
    credential = data.username;
    type = 1;
  } else {
    result.code = 400;
    return result;
  }

  // Test if data is object else return with bad content 400
  if (!isObject(data)) {
    result.code = 400;
    return result;
  }

  // Test if username, email, password exist else return with bad content 400
  if (!credential || !data.password) {
    result.code = 400;
    return result;
  }

  // Test if username, email, password are string else return with bad content 400
  if (typeof credential !== "string" || typeof data.password !== "string") {
    result.code = 400;
    return result;
  }

  // Return result
  return result;
}