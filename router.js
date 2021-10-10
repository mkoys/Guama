// Import in Express
const express = require("express");

// Import Auth routers
const register = require("./auth/api/register");
const login = require("./auth/api/login");

// Create Express Router
const router = express.Router();

// Route map for router to import
// Define routers here
// Example: {path: "/auth/login", router: <Express Router Object>}
routeMap = [
    { path: "/auth/register", router: register },
    { path: "/auth/login", router: login }
]

// Loop over each path defined in routeMap and use it
for(let i = 0; i < routeMap.length; i++) {
    router.use(routeMap[i].path, routeMap[i].router)
}

// Export router
module.exports = router;