// Import database connection
const mongodb = require("../../connect.js");

// Creates and saves user based on given data
module.exports = async function createUser(data) {
    // Get database
    const database = mongodb.get();

    // Set database collection and store it
    const users = database.collection("users");

    // Find in users if user with same details exist
    const foundUser = await users.findOne({ email: data.email.toLowerCase() });

    // Return 1 if duplicate 0 if none
    if (foundUser) {
        return 1
    } else {
        return 0;
    }
}