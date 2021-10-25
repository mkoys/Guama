// Parses incoming request
module.exports = function(req) {
  let token; // Stores token
  let coockies = {}; // Stores parsed cookies

  // If we have cookies
  if (req.headers.cookie) {
    // For each cookie split by = and loop over each second value
    for (let x = 0; x < req.headers.cookie.split("=").length; x = x + 2) {
      // Asign first value as ket to first vlaue of coockies and value as second value and loop
      coockies[req.headers.cookie.split("=")[x]] = req.headers.cookie.split("=")[x + 1];
    }
  }

  // If we have token in parsed cookies set token to token form cookie
  if (coockies.token) {
    token = coockies.token;
  } else {
    // Check if auth header is set else error
    if (!req.headers.authorization) {
      return {error: true};
    } else {
      // Get token from auth header
      token = req.headers.authorization.split(" ")[1];
    }
  }

  // Return parsed data
  return {
    token: token,
    cookies: coockies
  }
}