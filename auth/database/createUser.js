// Import functions
const hashPassword = require("../functions/hashPassword.js");

// Import settings
const settings = require("../../settings.js");

// Import database connection
const mongodb = require("../../connect.js");

// Creates and saves user based on given data
module.exports = async function createUser(data, terminal) {
    if (terminal) {
        console.log(data);
        user = {
            id: data.id ? parseInt(data.id) : settings.generateId(),
            bio: data.bio ? data.bio : settings.defaultBio,
            email: data.email.toLowerCase(),
            avatar: data.avatar ? data.avatar : settings.defaultAvatar,
            status: data.status ? data.status : "",
            username: data.username ? data.username : data.username.toLowerCase(),
            displayName: data.username,
            passcode: await hashPassword(data.password),
            profile: "private",
            connect: {
                friends: [],
                send: [],
                pending: [],
                blocked: []
            }
        }
    } else {
        user = {
            id: settings.generateId(),
            bio: settings.defaultBio,
            email: data.email.toLowerCase(),
            avatar: settings.defaultAvatar,
            status: "",
            username: data.username.toLowerCase(),
            displayName: data.username,
            passcode: await hashPassword(data.password),
            profile: "private",
            connect: {
                friends: [],
                send: [],
                pending: [],
                blocked: []
            }
        }
    }

    // Get database
    const database = mongodb.get();

    // Set database collection to users
    const users = database.collection("users");

    // Inserts user to database
    users.insertOne(user);
}