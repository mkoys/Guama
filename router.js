// Import in Express
const express = require("express");

// Import Auth routers
const register = require("./auth/api/register.js");
const login = require("./auth/api/login.js");

// Import App routers
const me = require("./app/api/me.js");
const user = require("./app/api/user.js");
const message = require("./app/api/message.js");

// Create Express Router
const router = express.Router();

// Route map for router to import
// Define routers here
// Example: {path: "/auth/login", router: <Express Router Object>}
routeMap = [
    { path: "/auth/register", router: register },
    { path: "/auth/login", router: login },
    { path: "/app/me", router: me },
    { path: "/app/user", router: user},
    { path: "/app/message", router: message}
]

// Loop over each path defined in routeMap and use it
for(let i = 0; i < routeMap.length; i++) {
    router.use(routeMap[i].path, routeMap[i].router)
}

// Export router
module.exports = router;