// Import session
const session = require("../../session.js");

// Import request parser
const requestParser = require("../functions/parseRequest.js");

// Register Route
module.exports = (req, res, next) => {
  // Parsers incoming request
  const parsedReq = requestParser(req);

  // Checks if user has session
  const hasSession = session.checkSession(parsedReq.token);

  // Maps parsed data to request for later use
  req.token = parsedReq.token;
  req.parsedCookie = parsedReq.cookies;

  // If we have no session res error else continue
  if(!hasSession) {
    res.json({ error: "No session" });
  }else {
    next();
  }
}