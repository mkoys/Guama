// Import database connection
const mongodb = require("../../connect.js");

// Creates and saves user based on given data
module.exports = function createUser(data) {
    // Get database
    const database = mongodb.get();

    // Set database collection
    database.collection("users");
}